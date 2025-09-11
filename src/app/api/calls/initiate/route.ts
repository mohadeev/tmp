import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import twilio from 'twilio'

const twilioClient = twilio(
	process.env.TWILIO_ACCOUNT_SID!,
	process.env.TWILIO_AUTH_TOKEN!,
)

export async function POST(req: Request) {
	try {
		const { advisorId, clientPhone } = await req.json()

		if (!advisorId || !clientPhone) {
			return NextResponse.json(
				{ message: 'advisorId and clientPhone are required' },
				{ status: 400 },
			)
		}

		// 1. Find advisor in DB
		const advisor = await prisma.user.findUnique({
			where: { id: advisorId },
			include: { advisorProfile: true },
		})

		if (!advisor || !advisor.phone) {
			return NextResponse.json(
				{ message: 'Advisor not found or missing phone' },
				{ status: 404 },
			)
		}

		// 2. First, call the advisor
		const call = await twilioClient.calls.create({
			to: advisor.phone, // advisor receives the call
			from: process.env.TWILIO_PHONE_NUMBER!, // must be a Twilio number
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/calls/bridge?clientPhone=${encodeURIComponent(
				clientPhone,
			)}`,
		})

		// 3. Save call in DB
		const dbCall = await prisma.call.create({
			data: {
				clientId: 'TEMP_CLIENT_ID', // Replace with real clientId from auth
				advisorId: advisor.id,
				status: 'PENDING',
				ratePerMinute: advisor.advisorProfile?.ratePerMinute ?? 0,
				twilioCallSid: call.sid,
			},
		})

		return NextResponse.json({ callId: dbCall.id })
	} catch (error: any) {
		console.error('Call initiation error:', error)
		return NextResponse.json(
			{ message: 'Failed to initiate call', error: error.message },
			{ status: 500 },
		)
	}
}
