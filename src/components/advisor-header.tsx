import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, LogOut, Settings } from "lucide-react"
import Link from "next/link"

export function AdvisorHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Phone className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ConsultPro</span>
          <Badge variant="secondary" className="ml-2">
            Advisor
          </Badge>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/advisor/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/advisor/calls" className="text-sm font-medium hover:text-primary transition-colors">
            Call History
          </Link>
          <Link href="/advisor/earnings" className="text-sm font-medium hover:text-primary transition-colors">
            Earnings
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
