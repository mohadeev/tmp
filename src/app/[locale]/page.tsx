import { Hero } from '@/components/hero'
import { FeaturedAdvisors } from '@/components/featured-advisors'
import { HowItWorks } from '@/components/how-it-works'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function HomePage() {
	return (
		<div className="bg-background min-h-screen">
			<Header />
			<main>
				<Hero />
				<FeaturedAdvisors />
				<HowItWorks />
				<Pricing />
				<Testimonials />
			</main>
			<Footer />
		</div>
	)
}
