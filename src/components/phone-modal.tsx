'use client'

import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PhoneModalProps {
	open: boolean
	onClose: () => void
	onSubmit: (phone: string) => void
}

export function PhoneModal({ open, onClose, onSubmit }: PhoneModalProps) {
	const [phone, setPhone] = useState('')

	const handleSubmit = () => {
		if (!phone) return
		onSubmit(phone)
		setPhone('')
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Enter your phone number</DialogTitle>
				</DialogHeader>
				<Input
					type="tel"
					placeholder="+123456789"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
