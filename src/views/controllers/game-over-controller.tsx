'use client'

import Button from '@/components/button'
import { cn } from '@/utils'
import { springOption } from '@/utils/helpers/motion'
import { useAppDispatch } from '@/utils/store/hooks'
import { retry } from '@/utils/store/slices/game-slice'
import { motion } from 'motion/react'

const GameOverController = () => {
    const dispatch = useAppDispatch()

    const handleRetry = () => {
        dispatch(retry())
    }

    return (
        <motion.div
            className={`w-full h-full flex flex-col items-center content-center justify-center gap-4`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: springOption }}>
            <motion.div
                layout
                className={cn(
                    `w-full h-full flex flex-col items-center content-center justify-center rounded-sm relative bg-rose-950/20`,
                )}>
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
                    className={`text-black text-xl p-2 rounded-xs border-2 border-black ring-2 w-fit animate-pulse tracking-wider uppercase bg-rose-500 ring-rose-500`}>
                    GAME OVER
                </motion.h1>
            </motion.div>
            <div
                className={`flex flex-row gap-4 items-center content-center justify-center w-full`}>
                <Button onClick={handleRetry} className={`w-full`}>
                    RETRY
                </Button>
            </div>
        </motion.div>
    )
}

export default GameOverController
