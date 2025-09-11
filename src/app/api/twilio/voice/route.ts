import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(req: Request) {
	// Create TwiML response
	const twiml = new twilio.twiml.VoiceResponse()

	// Say text properly
	twiml.say(
		{ voice: 'alice', language: 'en-US' },
		'Hello from TMP, thank you for calling.',
	)

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
