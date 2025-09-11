'use client'
import { useState } from 'react'

export default function CallForm() {
	const [clientPhone, setClientPhone] = useState('')
	const [loading, setLoading] = useState(false)

	const handleCall = async () => {
		if (!clientPhone) return alert('Enter client phone number!')
		setLoading(true)
		const res = await fetch('/api/call/trigger', {
			method: 'POST',
			body: JSON.stringify({ clientPhone }),
		})
		const data = await res.json()
		setLoading(false)
		alert(data.success ? 'Call triggered!' : 'Error: ' + data.error)
	}

	return (
		<div className="space-y-2">
			<input
				type="tel"
				placeholder="Client phone (+346...)"
				value={clientPhone}
				onChange={(e) => setClientPhone(e.target.value)}
				className="w-full rounded border p-2"
			/>
			<button
				onClick={handleCall}
				disabled={loading}
				className="w-full rounded bg-blue-600 p-2 text-white"
			>
				{loading ? 'Calling...' : 'Call Client'}
			</button>
		</div>
	)
}
