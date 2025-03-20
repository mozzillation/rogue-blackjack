'use client'

import Button from '@/components/button'
import MonsterCard from '@/components/cards/monster'
import { cn } from '@/utils'
import { springOption } from '@/utils/helpers/motion'
import { useAppDispatch, useAppSelector } from '@/utils/store/hooks'
import { dealNewLevel } from '@/utils/store/slices/game-slice'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const LevelIntroController = () => {
    const { level } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const [isContinuable, setContinuable] = useState<boolean>(false)

    const handlePresence = () => {
        setContinuable(true)
    }
    const handleClick = () => dispatch(dealNewLevel())

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: springOption }}
            className={`w-full h-full flex flex-col items-center content-center justify-center gap-4`}>
            <div
                className={`bg-zinc-800 w-full h-full flex flex-col items-center content-center justify-center rounded-sm relative overflow-hidden`}>
                <div
                    className={`absolute top-0 left-0 p-2 tracking-wider text-zinc-500 animate-pulse`}>
                    LEVEL #{level}
                </div>
                <AnimatePresence>
                    <motion.div
                        initial={{ y: 1000, visibility: 'hidden' }}
                        animate={{
                            y: 0,
                            visibility: 'visible',
                            transition: { ...springOption, delay: 0.5 },
                        }}
                        onAnimationComplete={handlePresence}
                        className={`w-full h-full flex flex-col items-center content-center justify-center`}>
                        <MonsterCard />
                    </motion.div>
                </AnimatePresence>
            </div>
            <Button
                onClick={handleClick}
                className={cn(
                    `w-full`,
                    !isContinuable && `pointer-events-none opacity-25 cursor-progress`,
                )}>
                CONTINUE
            </Button>
        </motion.div>
    )
}

export default LevelIntroController
