'use client'

import Button from '@/components/button'
import Card from '@/components/cards/card'
import ScoreCounter from '@/components/score-counter'
import { cn } from '@/utils'
import { springOption } from '@/utils/helpers/motion'
import { useAppDispatch, useAppSelector } from '@/utils/store/hooks'
import { handlePlayerHit, handlePlayerStand } from '@/utils/store/slices/game-slice'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const LevelTableController = () => {
    const { player, dealer, stage } = useAppSelector((state) => state.game)

    const [isDealerTurn, setDealerTurn] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleHitPress = () => {
        dispatch(handlePlayerHit())
    }

    const handleStandPress = () => {
        dispatch(handlePlayerStand())
    }

    useEffect(() => {
        if (stage === 'standing') {
            setDealerTurn(true)
        }
    }, [stage])

    return (
        <motion.div
            className={`w-full h-full flex flex-col`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <motion.div
                layout
                className={`w-full h-full flex flex-col items-center content-center justify-center gap-4 bg-zinc-800 rounded-sm`}>
                <motion.div
                    className={`w-full h-auto flex flex-row items-center content-center justify-center gap-4`}>
                    <AnimatePresence mode="popLayout">
                        {dealer.hand.map((card, index) => (
                            <Card
                                key={index}
                                {...card}
                                direction="up"
                                isFaceDown={index > 0 && !isDealerTurn}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
                <ScoreCounter amount={dealer.score} isUnknown={!isDealerTurn} />
            </motion.div>
            <motion.div
                layout
                className={`w-full h-full flex flex-col items-center content-center justify-center gap-4`}>
                <motion.div
                    className={`w-full h-auto flex flex-row items-center content-center justify-center gap-4`}>
                    <AnimatePresence mode="popLayout">
                        {player.hand.map((card, index) => (
                            <Card key={index} {...card} />
                        ))}
                    </AnimatePresence>
                </motion.div>
                <ScoreCounter amount={player.score} />
            </motion.div>

            <AnimatePresence mode="popLayout">
                {stage !== 'standing' && stage !== 'outcoming' && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: stage === 'calculating' ? 0.25 : 1,
                            transition: springOption,
                        }}
                        exit={{ y: 100, opacity: 0, transition: springOption }}
                        className={cn(
                            `w-full flex flex-row gap-2 items-center content-center justify-center`,
                            stage === 'calculating' && `pointer-events-none`,
                        )}>
                        <Button onClick={handleHitPress} className={`w-full`}>
                            HIT
                        </Button>
                        <Button onClick={handleStandPress} className={`w-full`} variant="stand">
                            Stand
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default LevelTableController
