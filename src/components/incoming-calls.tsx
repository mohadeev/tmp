import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, PhoneCall, Clock, User } from "lucide-react"

const incomingCalls = [
  {
    id: 1,
    clientName: "Jennifer Walsh",
    topic: "Business Strategy",
    estimatedDuration: "30 minutes",
    status: "waiting",
    waitTime: "2 minutes",
  },
  {
    id: 2,
    clientName: "David Kim",
    topic: "Career Advice",
    estimatedDuration: "20 minutes",
    status: "scheduled",
    scheduledTime: "2:30 PM",
  },
]

export function IncomingCalls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5" />
          Incoming Calls
        </CardTitle>
        <CardDescription>Manage consultation requests and calls</CardDescription>
      </CardHeader>
      <CardContent>
        {incomingCalls.length > 0 ? (
          <div className="space-y-4">
            {incomingCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{call.clientName}</div>
                    <div className="text-sm text-muted-foreground">{call.topic}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {call.estimatedDuration}
                      {call.status === "waiting" && ` • Waiting ${call.waitTime}`}
                      {call.status === "scheduled" && ` • Scheduled ${call.scheduledTime}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={call.status === "waiting" ? "destructive" : "secondary"}>
                    {call.status === "waiting" ? "Urgent" : "Scheduled"}
                  </Badge>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <PhoneCall className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No incoming calls</p>
            <p className="text-sm">Calls will appear here when clients request consultations</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
