import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import twilio from "twilio"

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function POST(request: NextRequest, { params }: { params: { callId: string } }) {
  try {
    const { duration } = await request.json()
    const callId = params.callId

    // Get call data
    const call = await prisma.call.findUnique({
      where: { id: callId },
      include: {
        client: true,
        advisor: { include: { advisorProfile: true } },
      },
    })

    if (!call) {
      return NextResponse.json({ message: "Call not found" }, { status: 404 })
    }

    // Calculate cost
    const durationMinutes = Math.ceil(duration / 60) // Round up to nearest minute
    const cost = durationMinutes * call.ratePerMinute

    // End Twilio conference if exists
    if (call.twilioCallSid) {
      try {
        await client.conferences(call.twilioCallSid).update({ status: "completed" })
      } catch (twilioError) {
        console.error("Twilio conference end error:", twilioError)
      }
    }

    // Update call record
    const updatedCall = await prisma.call.update({
      where: { id: callId },
      data: {
        status: "COMPLETED",
        duration: durationMinutes,
        cost,
        endedAt: new Date(),
      },
    })

    // Deduct credits from client
    await prisma.user.update({
      where: { id: call.clientId },
      data: {
        credits: {
          decrement: durationMinutes,
        },
      },
    })

    // Update advisor stats
    if (call.advisor.advisorProfile) {
      await prisma.advisorProfile.update({
        where: { id: call.advisor.advisorProfile.id },
        data: {
          totalCalls: {
            increment: 1,
          },
        },
      })
    }

    return NextResponse.json({
      message: "Call ended successfully",
      call: updatedCall,
      cost,
      duration: durationMinutes,
    })
  } catch (error) {
    console.error("Call end error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
