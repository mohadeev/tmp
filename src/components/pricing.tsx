import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

const packages = [
  {
    name: "Starter",
    minutes: 30,
    price: 29,
    pricePerMinute: 0.97,
    popular: false,
    features: ["30 consultation minutes", "Access to all advisors", "No expiration", "24/7 support"],
  },
  {
    name: "Professional",
    minutes: 60,
    price: 54,
    pricePerMinute: 0.9,
    popular: true,
    features: [
      "60 consultation minutes",
      "Access to all advisors",
      "Priority booking",
      "No expiration",
      "24/7 support",
    ],
  },
  {
    name: "Business",
    minutes: 120,
    price: 96,
    pricePerMinute: 0.8,
    popular: false,
    features: [
      "120 consultation minutes",
      "Access to all advisors",
      "Priority booking",
      "Dedicated account manager",
      "No expiration",
      "24/7 support",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the package that fits your consultation needs. No hidden fees, no subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.name} className={`relative ${pkg.popular ? "border-primary shadow-lg" : ""}`}>
              {pkg.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">${pkg.price}</div>
                  <div className="text-sm text-muted-foreground">${pkg.pricePerMinute.toFixed(2)} per minute</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-primary">{pkg.minutes} minutes</div>
                  <div className="text-sm text-muted-foreground">consultation time</div>
                </div>

                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={pkg.popular ? "default" : "outline"} asChild>
                  <Link href={`/purchase?package=${pkg.name.toLowerCase()}`}>Buy {pkg.minutes} Minutes</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
