'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
	PhoneOff,
	Mic,
	MicOff,
	Volume2,
	VolumeX,
	Clock,
	User,
} from 'lucide-react'

interface CallInterfaceProps {
	callId: string
}

export function CallInterface({ callId }: CallInterfaceProps) {
	const [callStatus, setCallStatus] = useState<
		'connecting' | 'active' | 'ended'
	>('connecting')
	const [duration, setDuration] = useState(0)
	const [isMuted, setIsMuted] = useState(false)
	const [isSpeakerOn, setIsSpeakerOn] = useState(false)
	const [callData, setCallData] = useState({
		clientName: 'Jennifer Walsh',
		advisorName: 'Dr. Sarah Johnson',
		topic: 'Business Strategy',
		rate: 3.5,
	})

	// Timer for call duration
	useEffect(() => {
		let interval: NodeJS.Timeout
		if (callStatus === 'active') {
			interval = setInterval(() => {
				setDuration((prev) => prev + 1)
			}, 1000)
		}
		return () => clearInterval(interval)
	}, [callStatus])

	// Simulate call connection
	useEffect(() => {
		const timer = setTimeout(() => {
			setCallStatus('active')
		}, 3000)
		return () => clearTimeout(timer)
	}, [])

	const formatDuration = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}

	const handleEndCall = async () => {
		setCallStatus('ended')

		// End call via API
		try {
			await fetch(`/api/calls/${callId}/end`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ duration }),
			})
		} catch (error) {
			console.error('Error ending call:', error)
		}

		// Redirect after a short delay
		setTimeout(() => {
			window.location.href = '/dashboard'
		}, 3000)
	}

	const toggleMute = () => {
		setIsMuted(!isMuted)
		// In a real app, this would control the Twilio call
	}

	const toggleSpeaker = () => {
		setIsSpeakerOn(!isSpeakerOn)
		// In a real app, this would control audio output
	}

	if (callStatus === 'ended') {
		return (
			<div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
				<Card className="w-full max-w-md text-center">
					<CardHeader>
						<CardTitle>Call Ended</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="text-2xl font-bold text-primary">
							{formatDuration(duration)}
						</div>
						<div className="text-muted-foreground text-sm">
							Total cost: ${((duration / 60) * callData.rate).toFixed(2)}
						</div>
						<p className="text-sm">
							Thank you for using TMP. You'll be redirected shortly.
						</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="bg-muted mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
						<User className="h-10 w-10" />
					</div>
					<CardTitle className="text-xl">{callData.advisorName}</CardTitle>
					<p className="text-muted-foreground text-sm">{callData.topic}</p>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* Call Status */}
					<div className="space-y-2 text-center">
						<Badge
							variant={callStatus === 'active' ? 'default' : 'secondary'}
							className="text-sm"
						>
							{callStatus === 'connecting' ? 'Connecting...' : 'Active Call'}
						</Badge>

						{callStatus === 'active' && (
							<div className="font-mono flex items-center justify-center gap-2 text-lg">
								<Clock className="h-4 w-4" />
								{formatDuration(duration)}
							</div>
						)}

						<div className="text-muted-foreground text-sm">
							Rate: ${callData.rate}/min • Cost: $
							{((duration / 60) * callData.rate).toFixed(2)}
						</div>
					</div>

					{/* Call Controls */}
					<div className="flex justify-center gap-4">
						<Button
							variant={isMuted ? 'destructive' : 'outline'}
							size="lg"
							className="h-14 w-14 rounded-full"
							onClick={toggleMute}
						>
							{isMuted ? (
								<MicOff className="h-6 w-6" />
							) : (
								<Mic className="h-6 w-6" />
							)}
						</Button>

						<Button
							variant="destructive"
							size="lg"
							className="h-16 w-16 rounded-full"
							onClick={handleEndCall}
						>
							<PhoneOff className="h-6 w-6" />
						</Button>

						<Button
							variant={isSpeakerOn ? 'default' : 'outline'}
							size="lg"
							className="h-14 w-14 rounded-full"
							onClick={toggleSpeaker}
						>
							{isSpeakerOn ? (
								<Volume2 className="h-6 w-6" />
							) : (
								<VolumeX className="h-6 w-6" />
							)}
						</Button>
					</div>

					{/* Call Info */}
					<div className="text-muted-foreground text-center text-xs">
						Call ID: {callId.slice(-8)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
