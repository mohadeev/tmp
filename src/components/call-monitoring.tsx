import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Clock, DollarSign, AlertCircle } from 'lucide-react'

const activeCalls = [
	{
		id: 1,
		client: 'Jennifer Walsh',
		advisor: 'Dr. Sarah Johnson',
		duration: '12:34',
		status: 'active',
		cost: 43.75,
		topic: 'Business Strategy',
	},
	{
		id: 2,
		client: 'David Kim',
		advisor: 'Michael Chen',
		duration: '08:15',
		status: 'active',
		cost: 33.0,
		topic: 'Financial Planning',
	},
]

const recentCalls = [
	{
		id: 3,
		client: 'Maria Santos',
		advisor: 'Lisa Rodriguez lksdv',
		duration: '25:00',
		status: 'completed',
		cost: 68.75,
		topic: 'Career Coaching',
		endTime: '2 min ago',
	},
	{
		id: 4,
		client: 'John Doe',
		advisor: 'Dr. Sarah Johnson',
		duration: '15:30',
		status: 'completed',
		cost: 54.25,
		topic: 'Business Strategy',
		endTime: '5 min ago',
	},
]

export function CallMonitoring() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Phone className="h-5 w-5" />
					Call Monitoring
				</CardTitle>
				<CardDescription>Active and recent consultation calls</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Active Calls */}
				<div>
					<h4 className="mb-3 flex items-center gap-2 font-medium">
						<div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
						Active Calls ({activeCalls.length})
					</h4>
					<div className="space-y-3">
						{activeCalls.map((call) => (
							<div
								key={call.id}
								className="flex items-center justify-between rounded-lg border bg-green-50 p-3"
							>
								<div className="flex-1">
									<div className="font-medium">
										{call.client} ↔ {call.advisor}
									</div>
									<div className="text-muted-foreground text-sm">
										{call.topic}
									</div>
									<div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
										<span className="flex items-center gap-1">
											<Clock className="h-3 w-3" />
											{call.duration}
										</span>
										<span className="flex items-center gap-1">
											<DollarSign className="h-3 w-3" />${call.cost.toFixed(2)}
										</span>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Badge variant="default">Live</Badge>
									<Button variant="ghost" size="sm">
										<AlertCircle className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Recent Calls */}
				<div>
					<h4 className="mb-3 font-medium">Recent Calls</h4>
					<div className="space-y-3">
						{recentCalls.map((call) => (
							<div
								key={call.id}
								className="flex items-center justify-between rounded-lg border p-3"
							>
								<div className="flex-1">
									<div className="font-medium">
										{call.client} ↔ {call.advisor}
									</div>
									<div className="text-muted-foreground text-sm">
										{call.topic}
									</div>
									<div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
										<span className="flex items-center gap-1">
											<Clock className="h-3 w-3" />
											{call.duration}
										</span>
										<span className="flex items-center gap-1">
											<DollarSign className="h-3 w-3" />${call.cost.toFixed(2)}
										</span>
										<span>Ended {call.endTime}</span>
									</div>
								</div>
								<Badge variant="secondary">Completed</Badge>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
