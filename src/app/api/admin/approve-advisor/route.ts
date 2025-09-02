import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { advisorId, approved } = await request.json()

    const advisor = await prisma.user.findUnique({
      where: { id: advisorId },
      include: { advisorProfile: true },
    })

    if (!advisor || !advisor.advisorProfile) {
      return NextResponse.json({ message: "Advisor not found" }, { status: 404 })
    }

    if (approved) {
      // Approve advisor
      await prisma.advisorProfile.update({
        where: { id: advisor.advisorProfile.id },
        data: { isActive: true },
      })

      // TODO: Send approval email to advisor

      return NextResponse.json({ message: "Advisor approved successfully" })
    } else {
      // Reject advisor - delete profile and user
      await prisma.advisorProfile.delete({
        where: { id: advisor.advisorProfile.id },
      })

      await prisma.user.delete({
        where: { id: advisorId },
      })

      // TODO: Send rejection email to advisor

      return NextResponse.json({ message: "Advisor application rejected" })
    }
  } catch (error) {
    console.error("Advisor approval error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
