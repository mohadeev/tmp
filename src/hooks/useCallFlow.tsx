'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useUser, useClerk } from '@clerk/nextjs'
import { PhoneModal } from '@/components/phone-modal'

interface StartCallArgs {
	advisorId: string
	advisorName: string
	isAvailable: boolean
}

export function useCallFlow() {
	const { isSignedIn } = useUser()
	const { openSignIn } = useClerk()
	const { toast } = useToast()

	const [phone, setPhone] = useState('')
	const [isCalling, setIsCalling] = useState(false)
	const [showPhoneModal, setShowPhoneModal] = useState(false)
	const [pendingAdvisor, setPendingAdvisor] = useState<StartCallArgs | null>(
		null,
	)

	// Step 1: Trigger call flow
	const startCall = (advisor: StartCallArgs) => {
		if (!advisor.isAvailable) {
			toast({
				title: 'Advisor Unavailable',
				description: `${advisor.advisorName} is currently offline or busy.`,
				variant: 'destructive',
			})
			return
		}

		if (!isSignedIn) {
			openSignIn() // Clerk modal
			return
		}

		// If signed in but no phone yet → open modal
		if (!phone) {
			setPendingAdvisor(advisor)
			setShowPhoneModal(true)
			return
		}

		// If phone exists → call directly
		makeCall(advisor, phone)
	}

	// Step 2: After phone modal submit
	const handlePhoneSubmit = (userPhone: string) => {
		setPhone(userPhone)
		if (pendingAdvisor) {
			makeCall(pendingAdvisor, userPhone)
			setPendingAdvisor(null)
		}
		setShowPhoneModal(false)
	}

	// Step 3: Call API
	const makeCall = async (advisor: StartCallArgs, userPhone: string) => {
		setIsCalling(true)

		try {
			const res = await fetch('/api/calls/initiate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					clientPhone: userPhone,
					advisorId: advisor.advisorId,
					topic: 'General Consultation',
				}),
			})

			if (!res.ok) {
				const error = await res.json()
				throw new Error(error.message || 'Call failed')
			}

			const { callId } = await res.json()

			toast({
				title: 'Call Initiated',
				description: `Connecting you with ${advisor.advisorName}...`,
			})

			window.location.href = `/call/${callId}`
		} catch (err: any) {
			toast({
				title: 'Call Failed',
				description: err.message,
				variant: 'destructive',
			})
		} finally {
			setIsCalling(false)
		}
	}

	// Return hook API
	return {
		startCall,
		isCalling,
		PhoneModalUI: (
			<PhoneModal
				open={showPhoneModal}
				onClose={() => setShowPhoneModal(false)}
				onSubmit={handlePhoneSubmit}
			/>
		),
	}
}
