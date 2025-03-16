'use client'

import Button from '@/components/button'
import { cn } from '@/libs/utils'
import { generateNewLevel } from '@/store/actions/game-actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { motion } from 'motion/react'

const ENTERING_SPRING_OPTIONS = {
    stiffness: 800,
    damping: 40,
    mass: 1,
}

const OutcomeView = () => {
    const {
        level: { player, dealer, status },
    } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const handleNext = () => {
        dispatch(generateNewLevel())
    }

    const outcomeStyle = () => {
        switch (status) {
            case 'won':
                return `bg-accent text-black`
            case 'lost':
                return `bg-red-300 text-black`

            default:
                break
        }
    }

    return (
        <motion.div
            className={cn(`w-full h-full flex flex-col gap-2`)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...ENTERING_SPRING_OPTIONS, type: 'spring' } }}
            exit={{ opacity: 0, transition: { ...ENTERING_SPRING_OPTIONS, type: 'spring' } }}>
            <div
                className={cn(
                    `flex flex-col h-full items-center content-center justify-center p-4 overflow-hidden relative gap-4`,
                    outcomeStyle(),
                )}>
                <div>
                    {status === 'won' && `YOU WON!`}
                    {status === 'lost' && `YOU LOST!`}
                    {status === 'tie' && `IT'S A TIE!`}
                </div>
                <div>Your score: {player.score}</div>
                <div>Dealer`s score: {dealer.score}</div>
            </div>
            <div className={`w-full flex flex-row justify-center`}>
                <Button onClick={handleNext}>Next</Button>
            </div>
        </motion.div>
    )
}

export default OutcomeView
