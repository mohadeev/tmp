import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, role } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 })
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,
        credits: role === "CLIENT" ? 0 : undefined,
      },
    })

    // If advisor, create advisor profile
    if (role === "ADVISOR") {
      await prisma.advisorProfile.create({
        data: {
          userId: user.id,
          title: "Consultant",
          description: "Professional consultant ready to help",
          expertise: [],
          ratePerMinute: 2.5,
          isActive: false, // Needs approval
        },
      })
    }

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
