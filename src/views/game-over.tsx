'use client'

import Button from '@/components/button'
import { screenSpringOptions } from '@/libs/transitions'
import { cn } from '@/libs/utils'
import { startGame } from '@/store/actions/game-actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import cryptoRandomString from 'crypto-random-string'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useMemo, useTransition } from 'react'

const GameOverView = () => {
    const {
        seed,
        level: { index },
    } = useAppSelector((state) => state.game)

    const dispatch = useAppDispatch()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const lastLevel = useMemo(() => index, []) // Runs only on first render

    const handleRetry = () => {
        startTransition(() => {
            if (!seed) return
            dispatch(startGame(seed))
        })
    }

    const handleGenerateSeed = () => {
        startTransition(() => {
            const newSeed = cryptoRandomString({ length: 8, type: 'distinguishable' })

            if (newSeed) {
                router.replace(`/${newSeed}`)
                dispatch(startGame(newSeed))
            }
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: screenSpringOptions }}
            exit={{ opacity: 0, y: -10, transition: screenSpringOptions }}
            className={`w-full h-full flex flex-col items-center content-center justify-center gap-4`}>
            <header
                className={`flex flex-col items-center content-center justify-center gap-2 from-black/0 to-zinc-700 bg-gradient-to-t h-full w-full rounded-sm`}>
                <motion.h1
                    animate={{
                        rotate: [-10, 0],
                        transition: {
                            repeat: Infinity,
                            repeatDelay: 1,
                            type: 'spring',
                            stiffness: 500,
                            damping: 10,
                            mass: 1,
                        },
                    }}
                    className={`bg-rose-300 text-black text-xl p-2 rounded-xs border-2 border-black outline outline-rose-300/50 w-fit animate-pulse tracking-wider`}>
                    GAME OVER
                </motion.h1>
                <div>You reached level #{lastLevel}</div>
                <div className={`flex flex-col items-center content-center opacity-50`}>
                    {/* <div>Your score: {latestOutcome?.playerScore}</div>
                    <div>
                        {latestOutcome?.enemyName}
                        &apos;s score: {latestOutcome?.dealerScore}
                    </div> */}
                </div>
            </header>
            <div
                className={cn(
                    `w-full flex flex-col gap-4 transition-all`,
                    isPending && `cursor-progress opacity-50 pointer-events-none`,
                )}>
                <Button onClick={handleRetry} className={`w-full`}>
                    RETRY
                </Button>
                <Button onClick={handleGenerateSeed} className={`w-full`}>
                    NEW GAME
                </Button>
            </div>
        </motion.div>
    )
}

export default GameOverView
