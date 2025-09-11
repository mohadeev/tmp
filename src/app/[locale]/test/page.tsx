'use client'

import { useEffect, useState } from 'react'
import { Device } from '@twilio/voice-sdk'

export default function TwilioHello() {
	const [device, setDevice] = useState<Device | null>(null)
	const [status, setStatus] = useState('Initializing...')

	useEffect(() => {
		async function requestMic() {
			try {
				await navigator.mediaDevices.getUserMedia({ audio: true })
				console.log('Microphone permission granted')
			} catch (err) {
				console.error('Microphone access denied:', err)
				alert('Please allow microphone access to make calls.')
			}
		}

		requestMic()

		async function initTwilio() {
			try {
				const res = await fetch('/api/twilio/token')
				const { token } = await res.json()

				const twilioDevice = new Device(token, { logLevel: 1 })

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

	const playMessage = () => {
		if (!device) return
		device.connect({ params: { To: 'browser' } }) // TwiML webhook handles the message
		setStatus('Playing message...')
	}

	const hangUp = () => {
		if (!device) return
		device.disconnectAll()
		setStatus('Call ended')
	}

	return (
		<div className="flex flex-col items-center gap-4 p-6">
			<h1 className="text-xl font-bold">Twilio Hello Test</h1>
			<p className="text-gray-700">Status: {status}</p>
			<div className="flex gap-4">
				<button
					onClick={playMessage}
					className="rounded-lg bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
				>
					Play Message
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
