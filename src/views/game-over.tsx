'use client'

import { useAppSelector } from '@/store/hooks'
import { motion } from 'motion/react'

const ENTERING_SPRING_OPTIONS = {
    stiffness: 800,
    damping: 40,
    mass: 1,
}

const GameOverView = () => {
    const {
        level: { index },
    } = useAppSelector((state) => state.game)
    // const dispatch = useAppDispatch()

    // const handleNext = () => {
    //     dispatch(generateNewLevel())
    // }

    return (
        <motion.div
            className={`w-full h-full flex flex-col items-center content-center justify-between p-4 border-zinc-500 border-2 border-dotted overflow-hidden relative gap-4 bg-zinc-800`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...ENTERING_SPRING_OPTIONS, type: 'spring' } }}
            exit={{ opacity: 0, transition: { ...ENTERING_SPRING_OPTIONS, type: 'spring' } }}>
            <div>GAME OVER</div>
            <div>You reached level #{index} </div>
        </motion.div>
    )
}

export default GameOverView
