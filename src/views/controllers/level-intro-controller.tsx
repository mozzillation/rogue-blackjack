'use client'

import MonsterCard from '@/components/cards/monster'
import { useAppDispatch, useAppSelector } from '@/utils/store/hooks'
import { dealNewLevel } from '@/utils/store/slices/game-slice'

const LevelIntroController = () => {
    const { level } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const handleClick = () => dispatch(dealNewLevel())

    return (
        <div className={`w-full h-full flex flex-col items-center content-center justify-center`}>
            <div
                className={`bg-zinc-800 w-full h-full flex flex-col items-center content-center justify-center`}>
                <div
                    className={`absolute top-0 left-0 p-2 tracking-wider text-zinc-500 animate-pulse`}>
                    LEVEL #{level}
                </div>
                <MonsterCard />
                <button onClick={handleClick}>CLICK</button>
            </div>
        </div>
    )
}

export default LevelIntroController
