import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const packages = {
  starter: { name: "Starter", minutes: 30, price: 29 },
  professional: { name: "Professional", minutes: 60, price: 54 },
  business: { name: "Business", minutes: 120, price: 96 },
}

export async function POST(request: NextRequest) {
  try {
    const { packageId, customerEmail, customerName } = await request.json()

    const selectedPackage = packages[packageId as keyof typeof packages]
    if (!selectedPackage) {
      return NextResponse.json({ message: "Invalid package" }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${selectedPackage.name} Package`,
              description: `${selectedPackage.minutes} consultation minutes`,
            },
            unit_amount: selectedPackage.price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: customerEmail,
      metadata: {
        packageId,
        customerName,
        minutes: selectedPackage.minutes.toString(),
      },
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/purchase?package=${packageId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
