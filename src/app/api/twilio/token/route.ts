import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function GET() {
	try {
		const accountSid = process.env.TWILIO_ACCOUNT_SID!
		const apiKey = process.env.TWILIO_API_KEY!
		const apiSecret = process.env.TWILIO_API_SECRET!
		const twimlAppSid = process.env.TWIML_APP_SID!

		if (!accountSid || !apiKey || !apiSecret || !twimlAppSid) {
			throw new Error('Missing Twilio environment variables')
		}

		const identity = 'user123' // change per logged-in user if needed

		const AccessToken = twilio.jwt.AccessToken
		const VoiceGrant = AccessToken.VoiceGrant

		const token = new AccessToken(accountSid, apiKey, apiSecret, { identity })

		const voiceGrant = new VoiceGrant({
			outgoingApplicationSid: twimlAppSid,
			incomingAllow: true,
		})

		token.addGrant(voiceGrant)

		return NextResponse.json({ token: token.toJwt() })
	} catch (err: any) {
		console.error('Twilio token error:', err)
		return NextResponse.json({ error: err.message }, { status: 500 })
	}
}
