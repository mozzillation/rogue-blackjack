'use client'

import { useAppDispatch, useAppSelector } from '@/utils/store/hooks'
import { generateSession } from '@/utils/store/slices/game-slice'
import { useEffect } from 'react'
import LevelIntroController from './controllers/level-intro-controller'
import LevelTableController from './controllers/level-table-controller'
import { AnimatePresence, motion } from 'motion/react'
import LevelOutcomeController from './controllers/level-outcome-controller'
import GameOverController from './controllers/game-over-controller'
import StatusBar from '@/components/status-bar'
import ShopController from './controllers/shop-controller'

type GameViewProps = {
    monsters: MonsterWithDetails[]
}

const GameView: React.FC<GameViewProps> = ({ monsters }) => {
    const { view, level } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!monsters) return
        dispatch(generateSession(monsters))
    }, [dispatch, monsters])

    if (!view || level === 0) return <>loading...</>

    return (
        <motion.div className={`w-full h-full flex flex-col gap-4 p-4`} layout>
            <StatusBar key="status-bar" />
            <AnimatePresence mode="wait">
                {view === 'intro' && <LevelIntroController key={`level-${level}-intro`} />}
                {view === 'table' && <LevelTableController key={`level-${level}-table`} />}
                {view === 'outcome' && <LevelOutcomeController key={`level-${level}-outcome`} />}
                {view === 'gameover' && <GameOverController key={`game-over`} />}
                {view === 'shop' && <ShopController key={`shop`} />}
            </AnimatePresence>
        </motion.div>
    )
}

export default GameView
