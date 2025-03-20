'use client'

import { cn } from '@/utils'
import { AnimatePresence, motion } from 'motion/react'

type ScoreCounterProps = {
    amount: number
    isUnknown?: boolean
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ amount, isUnknown = false }) => {
    return (
        <motion.div
            layout
            className={cn(
                `w-full text-white overflow-hidden relative rounded-sm leading-none flex flex-row items-center content-center justify-center text-center gap-0 `,
            )}>
            <AnimatePresence mode="popLayout">
                {amount && !isUnknown && (
                    <motion.div
                        className={cn(
                            `w-full text-center tracking-wider`,
                            amount > 21 && `text-rose-500`,
                            amount === 21 && `text-green-500`,
                        )}
                        key={`score-${amount}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}>
                        {amount}
                    </motion.div>
                )}
                {isUnknown && (
                    <motion.div
                        className={`w-full text-center tracking-wider`}
                        key={`score-unknown`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}>
                        ???
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default ScoreCounter
