// Modifiers

type MalusModifier =
    | { type: 'lose-coins'; amount: number }
    | { type: 'lose-all-coins' }
    | { type: 'instant-game-over' }
    | { type: 'lose-health'; amount: number }
    | null

type SetupModifier =
    | { type: 'all-cards-covered'; amount: number }
    | { type: 'limited-hits'; amount: number }
    | { type: 'forced-hits'; amount: number }
    | null

// Enemies

type EnemyType = 'goblin' | 'ghost' | 'skeleton' | 'robot' | 'slime' | 'orc' | 'apex'

type Enemy = {
    name: string
    type: EnemyType
    health: number
    weight: number
    modifiers: {
        setup?: SetupModifier
        malus: MalusModifier
    }
}

type EnemyRawEntry = {
    health: number
    modifiers: {
        setup?: SetupModifier
        malus: MalusModifier
    }
    names: string[]
}

// Cards & Deck

type Card = {
    value: string
    suit: string
    rank: number
    isNumbered: boolean
    isFaced: boolean
    isAce: boolean
    points: number
}

type Deck = {
    shuffle: CardType[]
}
