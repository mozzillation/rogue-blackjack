'use client'

import Button from '@/components/button'
import { cn } from '@/libs/utils'
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
        <div
            className={cn(
                `w-full h-full flex flex-col items-center content-center justify-center transition-all`,
                isPending && `pointer-events-none opacity-50 cursor-progress`,
            )}>
            <Button onClick={handleGenerateSeed}>Start</Button>
        </div>
    )
}

export default WelcomeView
