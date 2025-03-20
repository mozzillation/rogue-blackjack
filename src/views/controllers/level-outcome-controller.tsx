'use client'

import Button from '@/components/button'
import { springOption } from '@/utils/helpers/motion'
import { useAppDispatch, useAppSelector } from '@/utils/store/hooks'
import { nextLevel } from '@/utils/store/slices/game-slice'
import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import Outcome from '@/components/outcome'

type LastRefProps = {
    level: number
    dealer: {
        score: number
    }
    player: {
        score: number
    }
    outcome: 'tie' | 'blackjack' | 'won' | 'lost' | null
}

const LevelOutcomeController = () => {
    const { player, dealer, level, outcome } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const lastRef = useRef<LastRefProps | null>(null)

    useEffect(() => {
        if (!lastRef.current) {
            lastRef.current = { level, dealer, player, outcome }
        }
    }, [level, dealer, player, outcome])

    const last = lastRef.current ?? { level, dealer, player, outcome }

    const handleNextLevel = () => {
        dispatch(nextLevel())
    }

    // const handleVisitShop = () => {
    //     dispatch(visitShop())
    // }

    return (
        <motion.div
            className={`w-full h-full flex flex-col items-center content-center justify-center gap-4`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: springOption }}>
            <Outcome variant={last.outcome} />

            <div
                className={`flex flex-row gap-4 items-center content-center justify-center w-full`}>
                {/* <Button onClick={handleVisitShop} className={`w-full`} variant="shop">
                    SHOP
                </Button> */}
                <Button onClick={handleNextLevel} className={`w-full`}>
                    NEXT LEVEL
                </Button>
            </div>
        </motion.div>
    )
}

export default LevelOutcomeController
