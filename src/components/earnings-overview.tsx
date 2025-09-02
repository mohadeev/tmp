import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Calendar } from "lucide-react"

export function EarningsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Earnings Overview
        </CardTitle>
        <CardDescription>Your consultation earnings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">This Month</span>
            <span className="font-semibold">$847.50</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Last Month</span>
            <span className="font-semibold">$692.25</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Earned</span>
            <span className="font-semibold">$2,847.00</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
            <TrendingUp className="h-4 w-4" />
            <span>+22.4% from last month</span>
          </div>
          <Button className="w-full bg-transparent" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Detailed Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
