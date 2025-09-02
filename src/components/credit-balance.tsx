import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Plus } from "lucide-react"
import Link from "next/link"

export function CreditBalance() {
  // This would come from user data in a real app
  const credits = 45.5 // minutes

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Consultation Credits
        </CardTitle>
        <CardDescription>Your available consultation time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-primary">{credits} minutes</div>
            <p className="text-sm text-muted-foreground mt-1">Ready to use for consultations</p>
          </div>
          <Button asChild>
            <Link href="/purchase">
              <Plus className="h-4 w-4 mr-2" />
              Buy More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
