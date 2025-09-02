import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Phone } from "lucide-react"

const recentCalls = [
  {
    id: 1,
    advisor: "Dr. Sarah Johnson",
    duration: 25,
    cost: 87.5,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: 2,
    advisor: "Michael Chen",
    duration: 15,
    cost: 60.0,
    status: "completed",
    date: "2024-01-12",
  },
]

export function RecentCalls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Recent Consultations
        </CardTitle>
        <CardDescription>Your latest consultation sessions</CardDescription>
      </CardHeader>
      <CardContent>
        {recentCalls.length > 0 ? (
          <div className="space-y-4">
            {recentCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{call.advisor}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {call.duration} minutes
                    </span>
                    <span>${call.cost.toFixed(2)}</span>
                    <span>{call.date}</span>
                  </div>
                </div>
                <Badge variant="secondary">{call.status}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No consultations yet</p>
            <p className="text-sm">Start by finding an advisor</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
