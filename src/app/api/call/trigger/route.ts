import { NextResponse } from 'next/server'
import Twilio from 'twilio'

const client = Twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
)

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const clientPhone = body.clientPhone

		if (!clientPhone) throw new Error('Client phone is required')

		// TwiML URL that will bridge you to the client
		const twimlUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/call/bridge?clientPhone=${encodeURIComponent(clientPhone)}`

		// Step 1: Call your personal phone
		const call = await client.calls.create({
			url: twimlUrl,
			to: process.env.PERSONAL_PHONE,
			from: process.env.TWILIO_PHONE_NUMBER,
		})

		return NextResponse.json({ success: true, callSid: call.sid })
	} catch (error: any) {
		return NextResponse.json({ success: false, error: error.message })
	}
}
