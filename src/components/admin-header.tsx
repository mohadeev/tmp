import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Settings, LogOut, Bell } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Phone className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ConsultPro</span>
          <Badge variant="destructive" className="ml-2">
            Admin
          </Badge>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/admin/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/users" className="text-sm font-medium hover:text-primary transition-colors">
            Users
          </Link>
          <Link href="/admin/calls" className="text-sm font-medium hover:text-primary transition-colors">
            Calls
          </Link>
          <Link href="/admin/analytics" className="text-sm font-medium hover:text-primary transition-colors">
            Analytics
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
              3
            </Badge>
          </Button>
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
