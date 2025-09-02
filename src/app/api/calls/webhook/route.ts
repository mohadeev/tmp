import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const conferenceSid = formData.get("ConferenceSid") as string
    const statusCallbackEvent = formData.get("StatusCallbackEvent") as string

    console.log("Twilio webhook:", { conferenceSid, statusCallbackEvent })

    // Find call by Twilio conference SID
    const call = await prisma.call.findFirst({
      where: { twilioCallSid: conferenceSid },
    })

    if (!call) {
      console.log("Call not found for conference:", conferenceSid)
      return NextResponse.json({ message: "Call not found" }, { status: 404 })
    }

    // Update call status based on Twilio event
    switch (statusCallbackEvent) {
      case "conference-start":
        await prisma.call.update({
          where: { id: call.id },
          data: {
            status: "ACTIVE",
            startedAt: new Date(),
          },
        })
        break

      case "conference-end":
        await prisma.call.update({
          where: { id: call.id },
          data: {
            status: "COMPLETED",
            endedAt: new Date(),
          },
        })
        break

      case "participant-join":
        console.log("Participant joined conference:", conferenceSid)
        break

      case "participant-leave":
        console.log("Participant left conference:", conferenceSid)
        break

      default:
        console.log("Unhandled webhook event:", statusCallbackEvent)
    }

    return NextResponse.json({ message: "Webhook processed" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ message: "Webhook error" }, { status: 500 })
  }
}
