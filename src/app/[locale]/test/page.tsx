'use client'

import { useEffect, useState } from 'react'

export default function Home() {
	const [device, setDevice] = useState(null)

	useEffect(() => {
		async function initTwilio() {
			const res = await fetch('/api/twilio/token')
			const data = await res.json()

			const TwilioDevice = (await import('twilio-client')).Device
			const twilioDevice = new TwilioDevice(data.token, { logLevel: 1 })

			twilioDevice.on('ready', () => console.log('Twilio Device Ready'))
			twilioDevice.on('error', (err) => console.error('Twilio Error:', err))
			twilioDevice.on('disconnect', () => setDevice(null))

			setDevice(twilioDevice)
		}

		initTwilio()
	}, [])

	const callAdvisor = () => {
		if (device) device.connect()
	}

	const hangUp = () => {
		if (device) device.disconnectAll()
	}

	return (
		<div style={{ padding: 50 }}>
			<button onClick={callAdvisor} style={{ marginRight: 10 }}>
				Call Advisor
			</button>
			<button onClick={hangUp}>Hang Up</button>
		</div>
	)
}
