'use client'

import { useState, useEffect } from 'react'

interface Advisor {
	id: string
	name: string
	title: string
	avatar?: string
	rating: number
	reviews: number
	rate: number
	expertise: string[]
	isOnline: boolean
}

// ✅ Make sure this is a named export
export function useAdvisors(limit = 10) {
	console.log('limit:', limit)
	const [advisors, setAdvisors] = useState<Advisor[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchAdvisors() {
			try {
				const res = await fetch(`/api/advisors?limit=${limit}`)
				const data = await res.json()
				setAdvisors(data)
			} catch (error) {
				console.log('err')
				console.error('Failed to fetch advisors', error)
			} finally {
				setLoading(false)
			}
		}

		fetchAdvisors()
	}, [limit])

	return { advisors, loading }
}
