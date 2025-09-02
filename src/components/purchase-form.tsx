"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CreditCard, Lock } from "lucide-react"

interface Package {
  id: string
  name: string
  minutes: number
  price: number
  pricePerMinute: number
}

interface PurchaseFormProps {
  selectedPackage: Package
}

export function PurchaseForm({ selectedPackage }: PurchaseFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create Stripe checkout session
      const response = await fetch("/api/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
        }),
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      } else {
        const error = await response.json()
        toast({
          title: "Payment Failed",
          description: error.message || "Something went wrong",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="space-y-4">
        <h3 className="font-semibold">Order Summary</h3>
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span>{selectedPackage.name} Package</span>
            <span className="font-medium">${selectedPackage.price}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{selectedPackage.minutes} consultation minutes</span>
            <span>${selectedPackage.pricePerMinute.toFixed(2)}/min</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${selectedPackage.price}</span>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="font-semibold">Customer Information</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay ${selectedPackage.price} with Stripe
          </>
        )}
      </Button>

      {/* Security Notice */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" />
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  )
}
