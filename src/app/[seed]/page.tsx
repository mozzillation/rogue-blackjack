import GameView from '@/views/game-view'

type SeedPageProps = {
    params: Promise<{ seed: string }>
}

const SeedPage: React.FC<SeedPageProps> = async ({ params }) => {
    const { seed } = await params

    return <GameView seed={seed} />
}

export default SeedPage
