import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Phone, DollarSign, UserCheck, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$47,892",
    change: "+18.2%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Total Calls",
    value: "1,234",
    change: "+8.7%",
    icon: Phone,
    trend: "up",
  },
  {
    title: "Active Advisors",
    value: "89",
    change: "+15.3%",
    icon: UserCheck,
    trend: "up",
  },
  {
    title: "Pending Approvals",
    value: "12",
    change: "+3",
    icon: AlertTriangle,
    trend: "neutral",
  },
  {
    title: "Platform Growth",
    value: "24.8%",
    change: "+2.1%",
    icon: TrendingUp,
    trend: "up",
  },
]

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-600"
                }
              >
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
