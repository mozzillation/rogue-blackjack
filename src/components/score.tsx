'use client'

import { AnimatePresence, motion } from 'motion/react'

type ScoreProps = {
    amount: number
    isUnknown?: boolean
}

const Score: React.FC<ScoreProps> = ({ amount, isUnknown = false }) => {
    return (
        <motion.div
            layout
            className={`w-full text-white overflow-hidden relative rounded-sm leading-none aspect-square max-w-5 flex flex-row items-center content-center justify-center text-center gap-0 tracking-wider`}>
            <AnimatePresence mode="popLayout">
                {amount && !isUnknown && (
                    <motion.div
                        className={`w-full text-center`}
                        key={`score-${amount}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}>
                        {amount}
                    </motion.div>
                )}
                {isUnknown && (
                    <motion.div
                        className={`w-full text-center`}
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

export default Score
