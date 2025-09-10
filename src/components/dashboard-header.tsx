import { Button } from '@/components/ui/button'
import { Phone, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export function DashboardHeader() {
	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<Phone className="h-6 w-6 text-primary" />
					<span className="text-xl font-bold">TMP</span>
				</Link>

				<nav className="hidden items-center gap-6 md:flex">
					<Link
						href="/dashboard"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Dashboard
					</Link>
					<Link
						href="/advisors"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Find Advisors
					</Link>
					<Link
						href="/calls"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						My Calls
					</Link>
				</nav>

				<div className="flex items-center gap-3">
					<Button variant="ghost" size="sm">
						<User className="mr-2 h-4 w-4" />
						Profile
					</Button>
					<Button variant="ghost" size="sm">
						<LogOut className="mr-2 h-4 w-4" />
						Sign Out
					</Button>
				</div>
			</div>
		</header>
	)
}
