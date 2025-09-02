import { AdvisorHeader } from "@/components/advisor-header"
import { AdvisorStats } from "@/components/advisor-stats"
import { AvailabilityManager } from "@/components/availability-manager"
import { IncomingCalls } from "@/components/incoming-calls"
import { EarningsOverview } from "@/components/earnings-overview"
import { ProfileSettings } from "@/components/profile-settings"

export default function AdvisorDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdvisorHeader />
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AdvisorStats />
            <AvailabilityManager />
            <IncomingCalls />
          </div>
          <div className="space-y-6">
            <EarningsOverview />
            <ProfileSettings />
          </div>
        </div>
      </main>
    </div>
  )
}
