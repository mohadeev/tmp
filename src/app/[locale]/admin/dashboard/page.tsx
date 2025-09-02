import { AdminHeader } from "@/components/admin-header"
import { AdminStats } from "@/components/admin-stats"
import { RevenueChart } from "@/components/revenue-chart"
import { UserManagement } from "@/components/user-management"
import { CallMonitoring } from "@/components/call-monitoring"
import { PendingApprovals } from "@/components/pending-approvals"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform overview and management</p>
          </div>

          <AdminStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <PendingApprovals />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserManagement />
            <CallMonitoring />
          </div>
        </div>
      </main>
    </div>
  )
}
