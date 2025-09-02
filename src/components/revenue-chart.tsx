"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", revenue: 4200, calls: 89 },
  { month: "Feb", revenue: 3800, calls: 76 },
  { month: "Mar", revenue: 5200, calls: 112 },
  { month: "Apr", revenue: 4600, calls: 98 },
  { month: "May", revenue: 6100, calls: 134 },
  { month: "Jun", revenue: 5800, calls: 127 },
  { month: "Jul", revenue: 7200, calls: 156 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue and call volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                name === "revenue" ? `$${value}` : value,
                name === "revenue" ? "Revenue" : "Calls",
              ]}
            />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" />
            <Bar dataKey="calls" fill="hsl(var(--secondary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
