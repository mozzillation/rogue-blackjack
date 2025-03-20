'use client'

import Button from '@/components/button'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

const InitialView = () => {
    const router = useRouter()

    const handleStart = () => {
        router.push('/game')
    }

    return (
        <motion.div
            className={`w-full h-full flex flex-col items-center content-center justify-center`}>
            <Button onClick={handleStart}>Start</Button>
        </motion.div>
    )
}

export default InitialView
