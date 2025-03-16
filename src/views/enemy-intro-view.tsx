'use client'

import Button from '@/components/button'
import EnemyCard from '@/components/enemy-card'
import { startLevel } from '@/store/actions/game-actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { motion } from 'motion/react'

const ENTERING_SPRING_OPTIONS = {
    stiffness: 800,
    damping: 40,
    mass: 1,
}

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
            className={`w-full h-full flex flex-col items-center content-center justify-between p-4 border-zinc-500 border-2 border-dotted overflow-hidden relative gap-4 bg-zinc-800`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...ENTERING_SPRING_OPTIONS, type: 'spring' } }}
            exit={{ opacity: 0, transition: { ...ENTERING_SPRING_OPTIONS, type: 'spring' } }}>
            <motion.div
                className={`uppercase tracking-wide text-lg border-b-2 border-zinc-500 pb-4 border-dotted w-full text-center`}>
                LEVEL #{index}
            </motion.div>
            <EnemyCard enemy={enemy} key={`enemy-${index}`} />
            <motion.div
                className={`flex flex-row items-center content-center justify-center w-full`}>
                <Button onClick={handleStartLevel}>CONTINUE</Button>
            </motion.div>
        </motion.div>
    )
}

export default EnemyIntroView
