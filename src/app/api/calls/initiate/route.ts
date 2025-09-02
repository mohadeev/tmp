import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import twilio from "twilio"

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function POST(request: NextRequest) {
  try {
    const { clientId, advisorId, topic } = await request.json()

    // Get client and advisor data
    const [clientUser, advisorUser] = await Promise.all([
      prisma.user.findUnique({ where: { id: clientId } }),
      prisma.user.findUnique({
        where: { id: advisorId },
        include: { advisorProfile: true },
      }),
    ])

    if (!clientUser || !advisorUser || !advisorUser.advisorProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check if client has enough credits
    const ratePerMinute = advisorUser.advisorProfile.ratePerMinute
    if (clientUser.credits < ratePerMinute) {
      return NextResponse.json({ message: "Insufficient credits" }, { status: 400 })
    }

    // Create call record
    const call = await prisma.call.create({
      data: {
        clientId,
        advisorId,
        status: "PENDING",
        ratePerMinute,
        scheduledAt: new Date(),
      },
    })

    // Create Twilio conference room
    const conference = await client.conferences.create({
      friendlyName: `consultation-${call.id}`,
      statusCallback: `${process.env.NEXTAUTH_URL}/api/calls/webhook`,
      statusCallbackMethod: "POST",
    })

    // Update call with Twilio conference SID
    await prisma.call.update({
      where: { id: call.id },
      data: { twilioCallSid: conference.sid },
    })

    return NextResponse.json({
      callId: call.id,
      conferenceId: conference.sid,
      message: "Call initiated successfully",
    })
  } catch (error) {
    console.error("Call initiation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
