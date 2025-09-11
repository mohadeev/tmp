import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(req: Request) {
	const twiml = new twilio.twiml.VoiceResponse()

	// Call Twilio number, then forward to personal number
	const dial = twiml.dial({ callerId: process.env.TWILIO_PHONE_NUMBER })
	dial.number('+34614520461')

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
