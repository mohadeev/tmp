import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MoreHorizontal, Ban, CheckCircle } from "lucide-react"

const recentUsers = [
  {
    id: 1,
    name: "Jennifer Walsh",
    email: "jennifer@example.com",
    role: "CLIENT",
    status: "active",
    joinDate: "2024-01-15",
    totalSpent: 247.5,
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    role: "ADVISOR",
    status: "active",
    joinDate: "2024-01-10",
    totalEarned: 1847.25,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    role: "ADVISOR",
    status: "pending",
    joinDate: "2024-01-20",
    totalEarned: 0,
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@example.com",
    role: "CLIENT",
    status: "suspended",
    joinDate: "2024-01-12",
    totalSpent: 89.5,
  },
]

export function UserManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>Recent user activity and management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{user.name}</div>
                  <Badge variant={user.role === "ADVISOR" ? "default" : "secondary"}>{user.role}</Badge>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : user.status === "pending" ? "secondary" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
                <div className="text-xs text-muted-foreground">
                  Joined {user.joinDate} •{" "}
                  {user.role === "CLIENT" ? `Spent $${user.totalSpent}` : `Earned $${user.totalEarned || 0}`}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user.status === "pending" && (
                  <Button size="sm" variant="outline">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                )}
                {user.status === "active" && (
                  <Button size="sm" variant="outline">
                    <Ban className="h-4 w-4 mr-1" />
                    Suspend
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
