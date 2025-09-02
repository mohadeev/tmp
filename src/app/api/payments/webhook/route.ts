import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session

        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email: session.customer_email! },
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: session.customer_email!,
              name: session.metadata?.customerName || "Customer",
              role: "CLIENT",
              credits: 0,
            },
          })
        }

        // Create payment record
        const payment = await prisma.payment.create({
          data: {
            clientId: user.id,
            amount: (session.amount_total || 0) / 100, // Convert from cents
            credits: Number.parseFloat(session.metadata?.minutes || "0"),
            status: "COMPLETED",
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent as string,
          },
        })

        // Add credits to user
        await prisma.user.update({
          where: { id: user.id },
          data: {
            credits: {
              increment: Number.parseFloat(session.metadata?.minutes || "0"),
            },
          },
        })

        console.log("Payment processed successfully:", payment.id)
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent

        // Update payment status to failed
        await prisma.payment.updateMany({
          where: { stripePaymentIntentId: failedPayment.id },
          data: { status: "FAILED" },
        })

        console.log("Payment failed:", failedPayment.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ message: "Webhook error" }, { status: 500 })
  }
}
