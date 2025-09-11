'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, User } from 'lucide-react'
import { useUser } from '@auth0/nextjs-auth0'
import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
	useClerk,
} from '@clerk/nextjs'
export function Header() {
	const { user, error, isLoading } = useUser()

	const { openSignIn, openSignUp } = useClerk()

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<Phone className="h-6 w-6 text-primary" />
					<span className="text-xl font-bold">TMP</span>
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
					<SignedOut>
						<Button
							onClick={() => openSignIn()}
							variant="ghost"
							size="sm"
							asChild
						>
							<Link href="#">
								<User className="mr-2 h-4 w-4" />
								Sign In
							</Link>
						</Button>
						<Button onClick={() => openSignUp()} size="sm" asChild>
							<Link href="#">Get Started</Link>
						</Button>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</header>
	)
}
