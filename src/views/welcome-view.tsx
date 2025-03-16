'use client'

import cryptoRandomString from 'crypto-random-string'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const WelcomeView = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleGenerateSeed = () => {
        startTransition(() => {
            const seed = cryptoRandomString({ length: 8, type: 'distinguishable' })

            if (seed) {
                router.push(`/${seed}`)
            }
        })
    }

    return (
        <button onClick={handleGenerateSeed} disabled={isPending}>
            Start
        </button>
    )
}

export default WelcomeView
