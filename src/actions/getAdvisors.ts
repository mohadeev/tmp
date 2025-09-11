import { prisma } from '@/lib/prisma'

export async function getAdvisors(limit = 10) {
	const users = await prisma.user.findMany({
		where: {
			//   role: "ADVISOR",
		},
		take: limit,
		include: {
			advisorProfile: true,
			availability: true,
		},
	})

	return users.map((user) => ({
		id: user.id,
		name: user.name,
		title: user.advisorProfile?.title || '',
		avatar: user.advisorProfile?.avatar,
		rating: user.advisorProfile?.rating || 0,
		reviews: 0, // TODO: compute from reviews table
		rate: user.advisorProfile?.ratePerMinute || 0,
		expertise: user.advisorProfile?.expertise || [],
		isOnline: user.availability?.some((a) => a.isActive) || false,
	}))
}
