import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const clientPhone = searchParams.get('clientPhone')

	if (!clientPhone) {
		return NextResponse.json(
			{ message: 'Missing clientPhone' },
			{ status: 400 },
		)
	}

	const twiml = new twilio.twiml.VoiceResponse()
	twiml.say('Please hold while I connect you to the client.')
	twiml.dial(clientPhone)

	return new NextResponse(twiml.toString(), {
		headers: { 'Content-Type': 'text/xml' },
	})
}
