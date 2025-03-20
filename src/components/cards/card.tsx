'use client'

import { springOption } from '@/utils/helpers/motion'
import { motion } from 'motion/react'

type CardProps = Card & {
    direction?: 'up' | 'down'
    isFaceDown?: boolean
}

const Card: React.FC<CardProps> = ({ rank, direction = 'down', isFaceDown = false }) => {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.8, y: direction === 'up' ? -50 : 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: springOption }}
            className={`w-full max-w-[50px] aspect-[5/7] bg-white rounded-sm border-2 border-black ring-2 ring-white text-black flex flex-row items-center content-center justify-center grow shadow-2xl`}>
            {isFaceDown ? `???` : rank}
        </motion.article>
    )
}

export default Card
