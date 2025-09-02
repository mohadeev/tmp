import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Jennifer Walsh",
    role: "Small Business Owner",
    content:
      "The business strategy consultation helped me increase my revenue by 40% in just 3 months. The advisor was incredibly knowledgeable and provided actionable insights.",
    rating: 5,
    avatar: "/business-woman-testimonial.png",
  },
  {
    name: "David Kim",
    role: "Software Engineer",
    content:
      "Career coaching session was exactly what I needed. Got a promotion within 6 weeks of implementing the advice. Worth every minute!",
    rating: 5,
    avatar: "/software-engineer-testimonial.png",
  },
  {
    name: "Maria Santos",
    role: "Entrepreneur",
    content:
      "Financial planning advice was spot-on. The advisor helped me restructure my investments and I'm already seeing better returns.",
    rating: 5,
    avatar: "/entrepreneur-woman-testimonial.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Real results from real consultations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-4 italic">"{testimonial.content}"</p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
