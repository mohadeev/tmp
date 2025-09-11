import { NextResponse } from 'next/server'
import twilio from 'twilio'

const PERSONAL_PHONE = '+34614520461'
const TWILIO_NUMBER = process.env.TWILIO_PHONE_NUMBER

export async function POST(req: Request) {
	const twiml = new twilio.twiml.VoiceResponse()

	// Step 1: Say a message to the caller
	twiml.say(
		{ voice: 'alice', language: 'en-US' },
		"Hello from TMP, thank you for calling. I'm transferring the call to Massin, please hold.",
	)

	// Step 2: Dial your personal phone and bridge the call
	twiml.dial({ callerId: TWILIO_NUMBER }, PERSONAL_PHONE)

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
