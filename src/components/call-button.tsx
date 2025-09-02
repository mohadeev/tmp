"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Phone, Loader2 } from "lucide-react"

interface CallButtonProps {
  advisorId: string
  advisorName: string
  isAvailable: boolean
  className?: string
}

export function CallButton({ advisorId, advisorName, isAvailable, className }: CallButtonProps) {
  const [isInitiating, setIsInitiating] = useState(false)
  const { toast } = useToast()

  const initiateCall = async () => {
    if (!isAvailable) {
      toast({
        title: "Advisor Unavailable",
        description: `${advisorName} is currently offline or busy.`,
        variant: "destructive",
      })
      return
    }

    setIsInitiating(true)

    try {
      const response = await fetch("/api/calls/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: "current-user-id", // This would come from auth context
          advisorId,
          topic: "General Consultation",
        }),
      })

      if (response.ok) {
        const { callId } = await response.json()

        toast({
          title: "Call Initiated",
          description: `Connecting you with ${advisorName}...`,
        })

        // Redirect to call interface
        window.location.href = `/call/${callId}`
      } else {
        const error = await response.json()
        toast({
          title: "Call Failed",
          description: error.message || "Unable to initiate call",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Call Failed",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsInitiating(false)
    }
  }

  return (
    <Button onClick={initiateCall} disabled={!isAvailable || isInitiating} className={className}>
      {isInitiating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Phone className="h-4 w-4 mr-2" />
          {isAvailable ? "Call Now" : "Offline"}
        </>
      )}
    </Button>
  )
}
