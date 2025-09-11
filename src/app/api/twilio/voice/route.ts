import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(req: Request) {
	// TwiML Response
	const twiml = new twilio.twiml.VoiceResponse()

	// Dial your Twilio phone first
	const dial = twiml.dial({ callerId: process.env.TWILIO_PHONE_NUMBER })

	// Forward to your personal number
	dial.number('+34614520461')

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
