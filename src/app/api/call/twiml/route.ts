import { NextResponse } from 'next/server'
import Twilio from 'twilio'

export async function GET(req: Request) {
	const twiml = new Twilio.twiml.VoiceResponse()

	// Step 1: Say a message
	twiml.say(
		{ voice: 'alice', language: 'en-US' },
		'Hello from TMP, thank you for calling. You will be connected shortly.',
	)

	// Optional: you can add more instructions here or bridge a call to someone else

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
