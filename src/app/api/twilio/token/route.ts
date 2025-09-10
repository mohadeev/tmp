import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function GET() {
	const AccessToken = twilio.jwt.AccessToken
	const VoiceGrant = AccessToken.VoiceGrant

	const voiceGrant = new VoiceGrant({
		outgoingApplicationSid: process.env.TWIML_APP_SID,
		incomingAllow: false,
	})

	const token = new AccessToken(
		process.env.TWILIO_ACCOUNT_SID!,
		process.env.TWILIO_API_KEY!,
		process.env.TWILIO_API_SECRET!,
		{
			identity: 'client_user', // required
			ttl: 3600, // optional, default 1 hour
		},
	)

	token.addGrant(voiceGrant)

	return NextResponse.json({ token: token.toJwt() })
}
