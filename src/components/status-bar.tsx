'use client'

import { springOption } from '@/utils/helpers/motion'
import { useAppSelector } from '@/utils/store/hooks'
import { motion } from 'motion/react'
import Image from 'next/image'

const StatusBar = () => {
    const { session } = useAppSelector((state) => state.game)

    return (
        <motion.div
            layout
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: springOption }}
            exit={{ y: -100, opacity: 0, transition: springOption }}
            className={`flex flex-row items-center content-center gap-2`}>
            <div>
                <Image src={'/coin.png'} width={20} height={20} alt="Coins" />
            </div>
            <div>{session.coins}</div>
            <div>
                <Image src={'/heart.png'} width={20} height={20} alt="Coins" />
            </div>
            <div>{session.health}</div>
        </motion.div>
    )
}

export default StatusBar
