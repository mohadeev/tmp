import { CallInterface } from "@/components/call-interface"
import { notFound } from "next/navigation"

export default function CallPage({ params }: { params: { callId: string } }) {
  // In a real app, you'd fetch call data from the database
  const callId = params.callId

  if (!callId) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <CallInterface callId={callId} />
    </div>
  )
}
