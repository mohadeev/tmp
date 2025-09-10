'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, User } from 'lucide-react'
import { useUser } from '@auth0/nextjs-auth0'

export function Header() {
	const { user, error, isLoading } = useUser()

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<Phone className="h-6 w-6 text-primary" />
					<span className="text-xl font-bold">ConsultPro</span>
				</Link>

				<nav className="hidden items-center gap-6 md:flex">
					<Link
						href="#advisors"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Find Advisors
					</Link>
					<Link
						href="#how-it-works"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						How It Works
					</Link>
					<Link
						href="#pricing"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Pricing
					</Link>
				</nav>

				<div className="flex items-center gap-3">
					{isLoading ? (
						<div>Loading...</div>
					) : user ? (
						<Button variant="ghost" size="sm">
							<Image
								src={
									user.picture ||
									'https://res.cloudinary.com/mohadeev/image/upload/v1757500113/20171206_01_c7jyk3.jpg'
								}
								alt={user.name || 'User'}
								width={32}
								height={32}
								className="rounded-full"
							/>
						</Button>
					) : (
						<>
							<Button variant="ghost" size="sm" asChild>
								<Link href="/auth/login">
									<User className="mr-2 h-4 w-4" />
									Sign In
								</Link>
							</Button>
							<Button size="sm" asChild>
								<Link href="/register">Get Started</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
