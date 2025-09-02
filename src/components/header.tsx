import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, User } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Phone className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ConsultPro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#advisors" className="text-sm font-medium hover:text-primary transition-colors">
            Find Advisors
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
