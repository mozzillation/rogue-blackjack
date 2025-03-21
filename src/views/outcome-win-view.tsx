'use client'

import Button from '@/components/button'
import { screenSpringOptions } from '@/libs/transitions'
import { generateNewLevel } from '@/store/actions/game-actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { motion } from 'motion/react'

const OutcomeWinView = () => {
    const {
        history: { outcomes },
    } = useAppSelector((state) => state.game)

    const latestOutcome = outcomes.length > 0 ? outcomes[outcomes.length - 1] : null

    const dispatch = useAppDispatch()

    const handleNextLevel = () => {
        dispatch(generateNewLevel())
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: screenSpringOptions }}
            exit={{ opacity: 0, y: -10, transition: screenSpringOptions }}
            className={`w-full h-full flex flex-col items-center content-center justify-center gap-4`}>
            <header
                className={`flex flex-col items-center content-center justify-center gap-2 from-black/0 to-emerald-900 bg-gradient-to-t h-full w-full rounded-sm`}>
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
                    className={`bg-emerald-300 text-black text-xl p-2 rounded-xs border-2 border-black outline outline-emerald-300/50 w-fit animate-pulse tracking-wider`}>
                    YOU WON
                </motion.h1>
                <div>You defeated {latestOutcome?.enemyName}</div>
                <div className={`flex flex-col items-center content-center opacity-50`}>
                    <div>Your score: {latestOutcome?.playerScore}</div>
                    <div>
                        {latestOutcome?.enemyName}
                        &apos;s score: {latestOutcome?.dealerScore}
                    </div>
                </div>
            </header>

            <Button onClick={handleNextLevel}>NEXT LEVEL</Button>
        </motion.div>
    )
}

export default OutcomeWinView
