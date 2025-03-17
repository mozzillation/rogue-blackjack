import GameView from '@/views/game-view'

type SeedPageProps = {
    params: Promise<{ seed: string }>
}

export const generateMetadata = async ({ params }: SeedPageProps) => {
    return {
        title: `Seed: ${(await params).seed}`,
    }
}

const SeedPage: React.FC<SeedPageProps> = async ({ params }) => {
    const { seed } = await params

    return <GameView seed={seed} />
}

export default SeedPage
