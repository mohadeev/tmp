import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Phone } from 'lucide-react'
import Link from 'next/link'
const DEFAULT_AVATAR =
	'https://res.cloudinary.com/mohadeev/image/upload/v1757500113/20171206_01_c7jyk3.jpg'

const advisors = [
	{
		id: 1,
		name: 'Dr. Sarah Johnson',
		title: 'Business Strategy Consultant',
		rating: 4.9,
		reviews: 127,
		rate: 3.5,
		expertise: ['Business Strategy', 'Marketing', 'Leadership'],
		isOnline: true,
	},
	{
		id: 2,
		name: 'Michael Chen',
		title: 'Financial Advisor',
		rating: 4.8,
		reviews: 89,
		rate: 4.0,
		expertise: ['Investment', 'Retirement Planning', 'Tax Strategy'],
		isOnline: true,
	},
	{
		id: 3,
		name: 'Lisa Rodriguez kjsdjkv',
		title: 'Career Coach',
		rating: 4.9,
		reviews: 156,
		rate: 2.75,
		expertise: ['Career Development', 'Interview Prep', 'Resume Review'],
		isOnline: false,
	},
]

export function FeaturedAdvisors() {
	return (
		<section id="advisors" className="bg-muted/30 px-4 py-20">
			<div className="container mx-auto max-w-6xl">
				<div className="mb-12 space-y-4 text-center">
					<h2 className="text-3xl font-bold md:text-4xl">Featured Advisors</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
						Connect with our top-rated professionals across various expertise
						areas
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{advisors.map((advisor) => (
						<Card
							key={advisor.id}
							className="transition-shadow hover:shadow-lg"
						>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="relative">
										<img
											src={advisor.avatar || DEFAULT_AVATAR} // <-- use Cloudinary default
											alt={advisor.name}
											className="h-16 w-16 rounded-full object-cover"
										/>
										{advisor.isOnline && (
											<div className="border-background absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 bg-green-500" />
										)}
									</div>

									<div className="min-w-0 flex-1">
										<h3 className="text-lg font-semibold">{advisor.name}</h3>
										<p className="text-muted-foreground mb-2 text-sm">
											{advisor.title}
										</p>
									</div>
								</div>
								<div className="mb-3 flex items-center gap-2">
									<div className="flex items-center gap-1">
										<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
										<span className="text-sm font-medium">
											{advisor.rating}
										</span>
									</div>
									<span className="text-muted-foreground text-sm">
										({advisor.reviews} reviews)
									</span>
								</div>
								<div className="mb-4 flex flex-wrap gap-1">
									{advisor.expertise.slice(0, 2).map((skill) => (
										<Badge key={skill} variant="secondary" className="text-xs">
											{skill}
										</Badge>
									))}
									{advisor.expertise.length > 2 && (
										<Badge variant="outline" className="text-xs">
											+{advisor.expertise.length - 2} more
										</Badge>
									)}
								</div>
								<div className="flex items-center justify-between">
									<div className="text-sm">
										<span className="font-semibold">${advisor.rate}/min</span>
									</div>
									<Button size="sm" disabled={!advisor.isOnline} asChild>
										<Link href={`/advisor/${advisor.id}`}>
											<Phone className="mr-2 h-4 w-4" />
											{advisor.isOnline ? 'Call Now' : 'Offline'}
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-8 text-center">
					<Button variant="outline" size="lg" asChild>
						<Link href="/advisors">View All Advisors</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
