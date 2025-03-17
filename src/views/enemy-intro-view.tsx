'use client'

import Button from '@/components/button'
import EnemyCard from '@/components/enemy-card'
import { screenSpringOptions } from '@/libs/transitions'
import { startLevel } from '@/store/actions/game-actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { motion } from 'motion/react'

const EnemyIntroView = () => {
    const {
        level: { enemy, index },
    } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const handleStartLevel = () => {
        dispatch(startLevel())
    }

    if (!enemy) return <div>no enemy</div>
    return (
        <motion.div
            className={`w-full h-full flex flex-col items-center content-center justify-between relative gap-2`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: screenSpringOptions }}
            exit={{ opacity: 0, y: -10, transition: screenSpringOptions }}>
            <motion.div
                className={`to-zinc-700  from-black/0 bg-gradient-to-t overflow-hidden w-full h-full flex flex-col items-center content-center justify-center rounded-sm`}>
                <motion.div
                    className={`uppercase tracking-wide text-lg w-full h-fit absolute top-0 left-0 p-4 opacity-50 leading-none`}>
                    LEVEL #{index}
                </motion.div>
                <EnemyCard enemy={enemy} key={`enemy-${index}`} />
            </motion.div>

            <motion.div
                className={`flex flex-row items-center content-center justify-center w-full`}>
                <Button onClick={handleStartLevel}>CONTINUE</Button>
            </motion.div>
        </motion.div>
    )
}

export default EnemyIntroView
