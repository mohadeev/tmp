'use client'
import { useState } from 'react'

export default function CallButton() {
	const [loading, setLoading] = useState(false)

	const handleCall = async () => {
		setLoading(true)
		const res = await fetch('/api/call/trigger', { method: 'POST' })
		const data = await res.json()
		console.log(data)
		setLoading(false)
		alert(data.success ? 'Call triggered!' : 'Failed: ' + data.error)
	}

	return (
		<button
			onClick={handleCall}
			disabled={loading}
			className="rounded bg-blue-600 p-2 text-white"
		>
			{loading ? 'Calling...' : 'Call Me'}
		</button>
	)
}
