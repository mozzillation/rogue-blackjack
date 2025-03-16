'use client'

import { cn } from '@/libs/utils'
import { useAppSelector } from '@/store/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const StatusBar = () => {
    const { player } = useAppSelector((state) => state.game)

    const [coinChange, setCoinChange] = useState<number | null>(null)
    const [healthChange, setHealthChange] = useState<number | null>(null)

    // Store previous values to detect changes
    const [prevCoins, setPrevCoins] = useState(player.coins)
    const [prevHealth, setPrevHealth] = useState(player.health)

    useEffect(() => {
        if (player.coins !== prevCoins) {
            setCoinChange(player.coins - prevCoins)
            setPrevCoins(player.coins)
            setTimeout(() => setCoinChange(null), 1000) // Hide tooltip after 1 sec
        }
    }, [player.coins, prevCoins])

    useEffect(() => {
        if (player.health !== prevHealth) {
            setHealthChange(player.health - prevHealth)
            setPrevHealth(player.health)
            setTimeout(() => setHealthChange(null), 1000) // Hide tooltip after 1 sec
        }
    }, [player.health, prevHealth])

    return (
        <motion.header
            className="h-auto relative"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}>
            <motion.div className="flex flex-row gap-2 relative">
                {/* Coins Display */}
                <motion.div
                    layout
                    className={`relative flex flex-row gap-1 items-center content-center justify-start`}>
                    <AnimatePresence mode="popLayout">
                        <motion.div className="flex flex-row gap-1" layout>
                            <div className={`w-6 h-6`}>
                                <Image src={`/coin.png`} height={24} width={24} alt="Heart" />
                            </div>
                            <motion.div>{player.coins}</motion.div>
                        </motion.div>

                        {coinChange !== null && (
                            <motion.div
                                key="coins-change"
                                className={cn(
                                    `tracking-wide z-20 w-fit h-fit`,
                                    coinChange > 0 ? `text-green-500` : `text-red-500`,
                                )}
                                layout
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.1 }}>
                                {coinChange > 0 ? `+${coinChange}` : coinChange}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Health Display */}
                <motion.div
                    layout
                    className={`relative flex flex-row gap-1 items-center content-center justify-start`}>
                    <AnimatePresence mode="popLayout">
                        <motion.div className="flex flex-row gap-1" layout>
                            <div className={`w-6 h-6`}>
                                <Image
                                    src={`/heart.png`}
                                    height={24}
                                    width={24}
                                    alt="Heart"
                                    className={`w-6 h-6`}
                                />
                            </div>
                            <motion.div>{player.health}</motion.div>
                        </motion.div>

                        {healthChange !== null && (
                            <motion.div
                                layout
                                key="health-change"
                                className={cn(
                                    `tracking-wide z-20 w-fit h-fit`,
                                    healthChange > 0 ? `text-green-500` : `text-red-500`,
                                )}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.1 }}>
                                {healthChange > 0 ? `+${healthChange}` : healthChange}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.header>
    )
}

export default StatusBar
