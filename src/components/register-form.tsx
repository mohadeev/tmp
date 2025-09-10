'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		role: 'CLIENT' as 'CLIENT' | 'ADVISOR',
	})
	const [agreedToTerms, setAgreedToTerms] = useState(false)
	const { toast } = useToast()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!agreedToTerms) {
			toast({
				title: 'Terms Required',
				description: 'Please agree to the terms and conditions',
				variant: 'destructive',
			})
			return
		}

		setIsLoading(true)

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				toast({
					title: 'Account Created!',
					description: 'Welcome to TMP. You can now sign in.',
				})
				// Redirect to login or dashboard
				window.location.href = '/login'
			} else {
				const error = await response.json()
				toast({
					title: 'Registration Failed',
					description: error.message || 'Something went wrong',
					variant: 'destructive',
				})
			}
		} catch (error) {
			toast({
				title: 'Registration Failed',
				description: 'Network error. Please try again.',
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Full Name</Label>
				<Input
					id="name"
					type="text"
					placeholder="Enter your full name"
					value={formData.name}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, name: e.target.value }))
					}
					required
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="Enter your email"
					value={formData.email}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, email: e.target.value }))
					}
					required
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="phone">Phone Number</Label>
				<Input
					id="phone"
					type="tel"
					placeholder="Enter your phone number"
					value={formData.phone}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, phone: e.target.value }))
					}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="role">I want to</Label>
				<Select
					value={formData.role}
					onValueChange={(value: 'CLIENT' | 'ADVISOR') =>
						setFormData((prev) => ({ ...prev, role: value }))
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select your role" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="CLIENT">Get expert advice (Client)</SelectItem>
						<SelectItem value="ADVISOR">
							Provide consultations (Advisor)
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex items-center space-x-2">
				<Checkbox
					id="terms"
					checked={agreedToTerms}
					onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
				/>
				<Label htmlFor="terms" className="text-sm">
					I agree to the{' '}
					<a href="/terms" className="text-primary hover:underline">
						Terms of Service
					</a>{' '}
					and{' '}
					<a href="/privacy" className="text-primary hover:underline">
						Privacy Policy
					</a>
				</Label>
			</div>

			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
				Create Account
			</Button>
		</form>
	)
}
