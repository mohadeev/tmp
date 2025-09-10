import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST() {
	const twiml = new twilio.twiml.VoiceResponse()
	const dial = twiml.dial({ callerId: process.env.TWILIO_PHONE_NUMBER })

	// Replace with the advisor's real phone number
	dial.number('+34614520461')

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
