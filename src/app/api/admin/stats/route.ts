import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get platform statistics
    const [totalUsers, totalAdvisors, totalCalls, totalRevenue, pendingApprovals, activeCalls] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADVISOR" } }),
      prisma.call.count(),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: "COMPLETED" },
      }),
      prisma.advisorProfile.count({ where: { isActive: false } }),
      prisma.call.count({ where: { status: "ACTIVE" } }),
    ])

    // Get monthly revenue data
    const monthlyRevenue = await prisma.payment.groupBy({
      by: ["createdAt"],
      _sum: { amount: true },
      _count: true,
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
        },
      },
    })

    return NextResponse.json({
      totalUsers,
      totalAdvisors,
      totalCalls,
      totalRevenue: totalRevenue._sum.amount || 0,
      pendingApprovals,
      activeCalls,
      monthlyRevenue,
    })
  } catch (error) {
    console.error("Admin stats error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
