import { getAllMonsters } from '@/utils/supabase/queries/monsters'
import GameView from '@/views/game-view'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

const createNewGame = async () => {
    const { data: monsters, error } = await getAllMonsters()
    return {
        monsters,
        error,
    }
}

const GamePage = async () => {
    const { monsters } = await createNewGame()

    if (!monsters) notFound()

    return (
        <>
            <GameView monsters={monsters} />
        </>
    )
}

export default GamePage
