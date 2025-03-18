'use client'

import { useAppDispatch, useAppSelector } from '@/utils/store/hooks'
import { playNextLevel } from '@/utils/store/slices/game-slice'
import { useEffect } from 'react'
import LevelIntroController from './controllers/level-intro-controller'
import LevelTableController from './controllers/level-table-controller'

type GameViewProps = {
    monsters: MonsterWithDetails[]
}

const GameView: React.FC<GameViewProps> = ({ monsters }) => {
    const { stage } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!monsters) return
        dispatch(playNextLevel(monsters))
    }, [dispatch, monsters])

    return (
        <div className={`w-full h-full flex`}>
            {stage === 'idle' && <LevelIntroController />}
            {stage !== 'idle' && stage !== 'outcome' && <LevelTableController />}
            {/* {monsters.map((monster) => (
                <div key={monster.id}>{monster.name}</div>
            ))} */}
        </div>
    )
}

export default GameView
