import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, Users, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Earnings",
    value: "$2,847",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Consultation Hours",
    value: "127.5",
    change: "+8.2%",
    icon: Clock,
    trend: "up",
  },
  {
    title: "Total Clients",
    value: "89",
    change: "+15.3%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Rating",
    value: "4.9",
    change: "+0.1",
    icon: TrendingUp,
    trend: "up",
  },
]

export function AdvisorStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> from last
              month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
