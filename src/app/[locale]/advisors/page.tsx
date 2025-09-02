import { AdvisorCard } from "@/components/advisor-card"
import { AdvisorFilters } from "@/components/advisor-filters"
import { Header } from "@/components/header"

const advisors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Business Strategy Consultant",
    rating: 4.9,
    reviews: 127,
    rate: 3.5,
    expertise: ["Business Strategy", "Marketing", "Leadership"],
    avatar: "/professional-woman-consultant.png",
    isOnline: true,
    description: "Experienced business consultant with 10+ years helping companies grow and optimize their operations.",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Financial Advisor",
    rating: 4.8,
    reviews: 89,
    rate: 4.0,
    expertise: ["Investment", "Retirement Planning", "Tax Strategy"],
    avatar: "/professional-financial-advisor.png",
    isOnline: true,
    description: "Certified financial planner specializing in investment strategies and retirement planning.",
  },
  {
    id: "3",
    name: "Lisa Rodriguez",
    title: "Career Coach",
    rating: 4.9,
    reviews: 156,
    rate: 2.75,
    expertise: ["Career Development", "Interview Prep", "Resume Review"],
    avatar: "/placeholder-p40et.png",
    isOnline: false,
    description: "Professional career coach helping individuals advance their careers and find their dream jobs.",
  },
]

export default function AdvisorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Find Your Advisor</h1>
            <p className="text-muted-foreground">Connect with verified professionals for expert guidance</p>
          </div>

          <AdvisorFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor) => (
              <AdvisorCard key={advisor.id} advisor={advisor} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
