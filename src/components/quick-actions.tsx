import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, History, CreditCard } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild className="w-full justify-start">
          <Link href="/advisors">
            <Search className="h-4 w-4 mr-2" />
            Find an Advisor
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start bg-transparent">
          <Link href="/calls">
            <History className="h-4 w-4 mr-2" />
            Call History
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start bg-transparent">
          <Link href="/purchase">
            <CreditCard className="h-4 w-4 mr-2" />
            Buy Minutes
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
