import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, CreditCard, Phone, MessageSquare } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds and complete your profile to get started",
  },
  {
    icon: CreditCard,
    title: "Buy Minutes",
    description: "Purchase consultation minutes at affordable rates with secure payment",
  },
  {
    icon: Phone,
    title: "Choose Advisor",
    description: "Browse verified experts and connect with the right advisor for your needs",
  },
  {
    icon: MessageSquare,
    title: "Get Expert Advice",
    description: "Start your consultation and get personalized guidance from professionals",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Get expert advice in four simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-primary">Step {index + 1}</div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
