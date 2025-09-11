'use client'

import { useEffect, useState } from 'react'
import { Device } from '@twilio/voice-sdk'

export default function TwilioCall() {
	const [device, setDevice] = useState<Device | null>(null)
	const [status, setStatus] = useState('Initializing...')

	useEffect(() => {
		async function initTwilio() {
			try {
				// Fetch Twilio token from your API route
				const res = await fetch('/api/twilio/token')
				const { token } = await res.json()

				const twilioDevice = new Device(token, { logLevel: 1 })

				// Event listeners
				twilioDevice.on('ready', () => setStatus('Device ready'))
				twilioDevice.on('error', (err) => setStatus(`Error: ${err.message}`))
				twilioDevice.on('connect', () => setStatus('Call connected'))
				twilioDevice.on('disconnect', () => setStatus('Call disconnected'))

				setDevice(twilioDevice)
			} catch (err) {
				console.error('Twilio initialization failed:', err)
				setStatus('Initialization failed')
			}
		}

		initTwilio()
	}, [])

	const makeCall = () => {
		if (!device) return
		// "To" can be a client identity or a placeholder; TwiML App will forward
		device.connect({ params: { To: 'browser' } })
		setStatus('Calling...')
	}

	const hangUp = () => {
		if (!device) return
		device.disconnectAll()
		setStatus('Call ended')
	}

	return (
		<div className="flex flex-col items-center gap-4 p-6">
			<h1 className="text-xl font-bold">Twilio Voice Call</h1>
			<p className="text-gray-700">Status: {status}</p>
			<div className="flex gap-4">
				<button
					onClick={makeCall}
					className="rounded-lg bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
				>
					Call
				</button>
				<button
					onClick={hangUp}
					className="rounded-lg bg-red-600 px-4 py-2 text-white shadow hover:bg-red-700"
				>
					Hang Up
				</button>
			</div>
		</div>
	)
}
