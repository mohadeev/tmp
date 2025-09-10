import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

export function AdvisorHeader() {
	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<Phone className="h-6 w-6 text-primary" />
					<span className="text-xl font-bold">TMP</span>
					<Badge variant="secondary" className="ml-2">
						Advisor
					</Badge>
				</Link>

				<nav className="hidden items-center gap-6 md:flex">
					<Link
						href="/dashboard"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Dashboard
					</Link>
					<Link
						href="/advisor/calls"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Call History
					</Link>
					<Link
						href="/advisor/earnings"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Earnings
					</Link>
				</nav>

				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 rounded-full bg-green-500"></div>
						<span className="text-muted-foreground text-sm">Online</span>
					</div>
					<Button variant="ghost" size="sm">
						<Settings className="mr-2 h-4 w-4" />
						Settings
					</Button>
					<a href="/auth/logout">
						<Button variant="ghost" size="sm">
							<LogOut className="mr-2 h-4 w-4" />
							Sign Out
						</Button>
					</a>
				</div>
			</div>
		</header>
	)
}
