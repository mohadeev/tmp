import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export function Footer() {
	return (
		<footer className="bg-muted/50 border-t">
			<div className="container py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Phone className="h-5 w-5 text-primary" />
							<span className="text-lg font-bold">TMP</span>
						</div>
						<p className="text-muted-foreground text-sm">
							Connect with verified professionals for expert advice on demand.
						</p>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold">For Clients</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="/advisors"
									className="text-muted-foreground hover:text-foreground"
								>
									Find Advisors
								</Link>
							</li>
							<li>
								<Link
									href="/pricing"
									className="text-muted-foreground hover:text-foreground"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="/how-it-works"
									className="text-muted-foreground hover:text-foreground"
								>
									How It Works
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold">For Advisors</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="/advisor/apply"
									className="text-muted-foreground hover:text-foreground"
								>
									Become an Advisor
								</Link>
							</li>
							<li>
								<Link
									href="/advisor/login"
									className="text-muted-foreground hover:text-foreground"
								>
									Advisor Login
								</Link>
							</li>
							<li>
								<Link
									href="/advisor/resources"
									className="text-muted-foreground hover:text-foreground"
								>
									Resources
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold">Support</h4>
						<ul className="space-y-2 text-sm">
							<li className="text-muted-foreground flex items-center gap-2">
								<Mail className="h-4 w-4" />
								support@tmp.com
							</li>
							<li className="text-muted-foreground flex items-center gap-2">
								<Phone className="h-4 w-4" />
								1-800-CONSULT
							</li>
						</ul>
					</div>
				</div>

				<div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
					<p>&copy; 2025 TMP. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
