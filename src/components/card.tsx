'use client'

import { AnimatePresence, motion } from 'motion/react'

type CardProps = {
    card: Card
    direction?: 'top' | 'down'
    isHidden?: boolean
}

const ENTERING_SPRING_OPTIONS = {
    stiffness: 700,
    damping: 25,
    mass: 1,
}

const Card: React.FC<CardProps> = ({ card, direction = 'top', isHidden = false }) => {
    const getY = () => {
        switch (direction) {
            case 'top':
                return -50
            case 'down':
                return 50
            default:
                return 0
        }
    }

    return (
        <motion.div
            layout
            initial={{ y: getY(), visibility: 'hidden', scale: 0.8 }}
            animate={{
                y: 0,
                scale: 1,
                visibility: 'visible',
                transition: { type: 'spring', ...ENTERING_SPRING_OPTIONS },
            }}
            className={`max-w-[40px] w-full aspect-[5/7] bg-white rounded-xs border-2 border-black outline-2 outline-white flex flex-col items-center content-center justify-center select-none shadow-2xl tracking-wider p-0.5 relative`}>
            <AnimatePresence mode="sync">
                {isHidden && (
                    <motion.div
                        className={`h-full w-full bg-black/20 absolute inset-0`}
                        key="backface"
                        exit={{ opacity: 0 }}
                    />
                )}
                {!isHidden && (
                    <motion.div
                        className={`text-black text-xl`}
                        key="frontface"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}>
                        {card.value}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Card
