import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
	try {
		const advisors = await prisma.user.findMany({
			where: { role: 'ADVISOR' },
			take: 10,
			include: {
				advisorProfile: true,
				availability: true,
			},
		})
		console.log('advisors', advisors)
		const formatted = advisors.map((user) => ({
			id: user.id,
			name: user.name,
			title: user.advisorProfile?.title || '',
			avatar: user.advisorProfile?.avatar || null,
			rating: user.advisorProfile?.rating || 0,
			reviews: 0, // can calculate later from reviews table
			rate: user.advisorProfile?.ratePerMinute || 0,
			expertise: user.advisorProfile?.expertise || [],
			isOnline: user.availability?.some((a) => a.isActive) || false,
		}))

		return NextResponse.json(formatted)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Failed to fetch advisors' },
			{ status: 500 },
		)
	}
}
