import { NextResponse } from 'next/server'
import Twilio from 'twilio'

const client = Twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
)

export async function POST(req: Request) {
	try {
		const twimlUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/call/twiml`

		// Make outbound call to your personal phone
		const call = await client.calls.create({
			url: twimlUrl, // TwiML URL to play message
			to: '+34614520461',
			from: process.env.TWILIO_PHONE_NUMBER!,
		})

		return NextResponse.json({ success: true, callSid: call.sid })
	} catch (error: any) {
        console.log("")
		return NextResponse.json({ success: false, error: error.message })
	}
}
