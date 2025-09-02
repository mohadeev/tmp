import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const role = searchParams.get("role")
    const status = searchParams.get("status")

    const where: any = {}
    if (role) where.role = role
    if (status === "active") where.advisorProfile = { isActive: true }
    if (status === "pending") where.advisorProfile = { isActive: false }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          advisorProfile: true,
          _count: {
            select: {
              clientCalls: true,
              advisorCalls: true,
              clientPayments: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Admin users error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
