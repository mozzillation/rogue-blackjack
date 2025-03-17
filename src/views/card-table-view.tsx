'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Card from '../components/card'
import { AnimatePresence, motion } from 'motion/react'
import Button from '@/components/button'
import { getNewCard, stand } from '@/store/actions/game-actions'
import { useState } from 'react'
import { cn } from '@/libs/utils'
import { screenSpringOptions } from '@/libs/transitions'
import Score from '@/components/score'

const CardTableView = () => {
    const [isPlayerTurn, setPlayerTurn] = useState<boolean>(true)

    const { level } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const handleHit = () => {
        if (level.isProcessing) return
        dispatch(getNewCard('player'))
    }

    const handleStand = () => {
        if (level.isProcessing) return
        setPlayerTurn(false)
        dispatch(stand())
    }

    return (
        <motion.div
            className={`w-full h-full grow flex flex-col`}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: screenSpringOptions }}
            exit={{ opacity: 0, y: -10, transition: screenSpringOptions }}>
            <motion.div
                layout
                className={`relative flex flex-row gap-4 w-full items-center content-center justify-center grow bg-zinc-700 rounded-xs`}>
                <AnimatePresence mode="popLayout">
                    {level.dealer.hand.map((card, index) => (
                        <Card key={index} card={card} isHidden={isPlayerTurn && index === 1} />
                    ))}
                </AnimatePresence>
                <div className={`w-full absolute bottom-2 right-2 flex flex-row justify-end`}>
                    <Score amount={level.dealer.score} isUnknown={isPlayerTurn} />
                </div>
            </motion.div>
            {/* <div>{level.dealer.score}</div>
            <div>{level.player.score}</div> */}

            <motion.div
                layout
                className={`flex flex-row gap-4 w-full items-center content-center justify-center grow relative`}>
                <AnimatePresence mode="popLayout">
                    {level.player.hand.map((card, index) => (
                        <Card key={index} card={card} direction="down" />
                    ))}
                </AnimatePresence>
                <div className={`w-full absolute top-2 right-2 flex flex-row justify-end`}>
                    <Score amount={level.player.score} />
                </div>
            </motion.div>

            <AnimatePresence mode="popLayout">
                {isPlayerTurn && (
                    <motion.div
                        className={cn(
                            `flex flex-row gap-2 transition-all`,
                            level.isProcessing && `opacity-50 pointer-events-none cursor-progress`,
                        )}
                        exit={{ opacity: 0, y: 100 }}
                        layout>
                        <Button onClick={handleHit} className={`w-full`}>
                            HIT
                        </Button>
                        <Button onClick={handleStand} className={`w-full`}>
                            STAND
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default CardTableView
