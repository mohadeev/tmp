import { LoginForm } from '@/components/login-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { Phone } from 'lucide-react'

export default function LoginPage() {
	return (
		<div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6">
				<div className="text-center">
					<Link href="/" className="mb-6 inline-flex items-center gap-2">
						<Phone className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">TMP</span>
					</Link>
				</div>

				<Card>
					<CardHeader className="text-center">
						<CardTitle>Welcome Back</CardTitle>
						<CardDescription>Sign in to your TMP account</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm />
						<div className="mt-6 text-center text-sm">
							Don't have an account?{' '}
							<Link href="/register" className="text-primary hover:underline">
								Sign up
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
