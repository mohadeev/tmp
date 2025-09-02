"use client"

import { PurchaseForm } from "@/components/purchase-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const packages = [
  {
    id: "starter",
    name: "Starter",
    minutes: 30,
    price: 29,
    pricePerMinute: 0.97,
    popular: false,
    features: ["30 consultation minutes", "Access to all advisors", "No expiration", "24/7 support"],
  },
  {
    id: "professional",
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
    id: "business",
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

export default function PurchasePage({
  searchParams,
}: {
  searchParams: { package?: string }
}) {
  const selectedPackage = packages.find((pkg) => pkg.id === searchParams.package) || packages[1]

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Package Selection */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Choose Your Package</h1>
              <p className="text-muted-foreground">Select the consultation minutes package that fits your needs</p>
            </div>

            <div className="space-y-4">
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`cursor-pointer transition-all ${
                    selectedPackage.id === pkg.id ? "border-primary shadow-md" : "hover:shadow-sm"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{pkg.name}</h3>
                          {pkg.popular && (
                            <Badge variant="default" className="text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="text-2xl font-bold text-primary mb-1">${pkg.price}</div>
                        <div className="text-sm text-muted-foreground mb-3">
                          {pkg.minutes} minutes • ${pkg.pricePerMinute.toFixed(2)}/min
                        </div>
                        <ul className="space-y-1">
                          {pkg.features.slice(0, 2).map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                              <Check className="h-3 w-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          name="package"
                          value={pkg.id}
                          checked={selectedPackage.id === pkg.id}
                          onChange={() => {
                            window.location.href = `/purchase?package=${pkg.id}`
                          }}
                          className="h-4 w-4 text-primary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Purchase</CardTitle>
                <CardDescription>Secure payment powered by Stripe</CardDescription>
              </CardHeader>
              <CardContent>
                <PurchaseForm selectedPackage={selectedPackage} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
