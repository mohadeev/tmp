import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Phone } from "lucide-react"
import Link from "next/link"

const advisors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Business Strategy Consultant",
    rating: 4.9,
    reviews: 127,
    rate: 3.5,
    expertise: ["Business Strategy", "Marketing", "Leadership"],
    avatar: "/professional-woman-consultant.png",
    isOnline: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Financial Advisor",
    rating: 4.8,
    reviews: 89,
    rate: 4.0,
    expertise: ["Investment", "Retirement Planning", "Tax Strategy"],
    avatar: "/professional-financial-advisor.png",
    isOnline: true,
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    title: "Career Coach",
    rating: 4.9,
    reviews: 156,
    rate: 2.75,
    expertise: ["Career Development", "Interview Prep", "Resume Review"],
    avatar: "/placeholder-p40et.png",
    isOnline: false,
  },
]

export function FeaturedAdvisors() {
  return (
    <section id="advisors" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Advisors</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with our top-rated professionals across various expertise areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisors.map((advisor) => (
            <Card key={advisor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={advisor.avatar || "/placeholder.svg"}
                      alt={advisor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {advisor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{advisor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{advisor.title}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{advisor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({advisor.reviews} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
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
                          <Phone className="h-4 w-4 mr-2" />
                          {advisor.isOnline ? "Call Now" : "Offline"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/advisors">View All Advisors</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
