'use client'

import StatusBar from '@/components/status-bar'
import { startGame } from '@/store/actions/game-actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import EnemyIntroView from './enemy-intro-view'
import CardTableView from '@/views/card-table-view'
import GameOverView from './game-over'
import OutcomeWinView from './outcome-win-view'
import OutcomeLostView from './outcome-lost-view'
import OutcomeTieView from './outcome-tie-view'

type GameViewProps = {
    seed: string
}

const GameView: React.FC<GameViewProps> = ({ seed }) => {
    const { level, status } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const handleSeedInit = () => {
            dispatch(startGame(seed))
        }

        if (seed) {
            handleSeedInit()
            setLoading(false)
        }
    }, [seed, dispatch])

    if (isLoading) return <>loading...</>
    if (!level || !level.enemy) return <>error...</>
    return (
        <motion.div className="w-full h-full flex flex-col p-2 gap-4" layout>
            <AnimatePresence mode="popLayout">
                {status !== 'game-over' && <StatusBar key="status-bar" />}
            </AnimatePresence>
            <motion.div
                layout
                className={`flex w-full flex-col items-center content-center justify-center grow h-full`}>
                <AnimatePresence mode="wait">
                    {level.status === 'idle' && <EnemyIntroView key={`intro-${level.index}`} />}
                    {level.status === 'playing' && <CardTableView key={`round-${level.round}`} />}
                    {status !== 'game-over' && level.status === 'won' && (
                        <OutcomeWinView key={`outcome-won-${level.round}`} />
                    )}
                    {status !== 'game-over' && level.status === 'lost' && (
                        <OutcomeLostView key={`outcome-lost-${level.round}`} />
                    )}
                    {status !== 'game-over' && level.status === 'tie' && (
                        <OutcomeTieView key={`outcome-tie-${level.round}`} />
                    )}

                    {status === 'game-over' && <GameOverView />}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

export default GameView
