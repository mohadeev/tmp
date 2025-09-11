import { currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function getOrCreateCurrentUser() {
	// Get the currently signed-in Clerk user
	const user = await currentUser()
	// console.log('user', user)
	// return 0
	if (!user) return null // Not signed in

	// Check if user exists in your DB
	let dbUser = await prisma.user.findUnique({
		where: { email: user.emailAddresses[0]?.emailAddress },
	})

	// If not, create a new record
	if (!dbUser) {
		dbUser = await prisma.user.create({
			data: {
				email: user.emailAddresses[0]?.emailAddress || '',
				name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
				role: 'CLIENT', // default role
				credits: 0, // default credits
			},
		})
		console.log('Created new user:', dbUser.id)
	}

	return dbUser
}
