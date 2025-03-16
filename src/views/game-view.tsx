'use client'

import StatusBar from '@/components/status-bar'
import { startGame } from '@/store/actions/game-actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import EnemyIntroView from './enemy-intro-view'
import CardTableView from '@/views/card-table-view'
import OutcomeView from './outcome-win-view'
import GameOverView from './game-over'

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
        <div className="w-full h-full flex flex-col p-2 gap-4">
            <AnimatePresence>
                <StatusBar />
            </AnimatePresence>
            <div
                className={`flex w-full flex-col items-center content-center justify-center grow h-full`}>
                <AnimatePresence mode="wait">
                    {level.status === 'idle' && <EnemyIntroView key={`intro-${level.index}`} />}
                    {level.status === 'playing' && <CardTableView key={`round-${level.round}`} />}
                    {status !== 'game-over' &&
                        (level.status === 'won' ||
                            level.status === 'tie' ||
                            level.status === 'lost') && (
                            <OutcomeView key={`outcome-${level.status}-${level.round}`} />
                        )}
                    {status === 'game-over' && <GameOverView />}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default GameView
