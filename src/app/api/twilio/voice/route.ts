import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(req: Request) {
	const twiml = new twilio.twiml.VoiceResponse()

	// Step 1: Say the message to the caller
	twiml.say(
		{ voice: 'alice', language: 'en-US' },
		"Hello from TMP, thank you for calling. I'm transferring the call to Massin, please hold.",
	)

	// Step 2: Dial your personal phone with proper bridge
	twiml.dial({ callerId: process.env.TWILIO_PHONE_NUMBER }, '+34614520461')

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
