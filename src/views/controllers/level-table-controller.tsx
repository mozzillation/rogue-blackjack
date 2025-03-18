'use client'

import Card from '@/components/cards/card'
import { useAppDispatch, useAppSelector } from '@/utils/store/hooks'
import { handlePlayerHit, handlePlayerStand } from '@/utils/store/slices/game-slice'

const LevelTableController = () => {
    const { player, dealer, stage } = useAppSelector((state) => state.game)
    const dispatch = useAppDispatch()

    const handleHitPress = () => {
        dispatch(handlePlayerHit())
    }

    const handleStandPress = () => {
        dispatch(handlePlayerStand())
    }

    console.log(dealer.hand)

    return (
        <div className={`w-full h-svh flex flex-col`}>
            <div
                className={`w-full h-full flex flex-row items-center content-center justify-center gap-2 bg-zinc-800`}>
                {dealer.hand.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
            <div
                className={`w-full h-full flex flex-row items-center content-center justify-center gap-2`}>
                {player.hand.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>

            {stage !== 'standing' && (
                <div
                    className={`w-full flex flex-row gap-2 items-center content-center justify-center`}>
                    <button onClick={handleHitPress}>HIT</button>
                    <button onClick={handleStandPress}>Stand</button>
                </div>
            )}
        </div>
    )
}

export default LevelTableController
