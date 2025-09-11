// /app/api/call/bridge/route.ts
import { NextResponse } from 'next/server'
import Twilio from 'twilio'

export async function POST(req: Request) {
	const url = new URL(req.url)
	const clientPhone = url.searchParams.get('clientPhone')
	if (!clientPhone) return NextResponse.json({ error: 'Client phone missing' })

	const twiml = new Twilio.twiml.VoiceResponse()

	twiml.say(
		{ voice: 'alice', language: 'en-US' },
		'Hello Massin, you will be connected to your client shortly.',
	)

	twiml.dial({ callerId: process.env.TWILIO_PHONE_NUMBER }, clientPhone)

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
