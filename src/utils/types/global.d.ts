enum MonsterType {
    Goblin = 'goblin',
    Skeleton = 'skeleton',
    Slime = 'slime',
    Ghost = 'ghost',
    Robot = 'robot',
    Orc = 'orc',
    Apex = 'apex',
}

enum Rarity {
    Common = 'common',
    Uncommon = 'uncommon',
    Rare = 'rare',
    Epic = 'epic',
    Legendary = 'legendary',
    Mythic = 'mythic',
}

interface Monster {
    id: string
    name: string
    type: MonsterType
    rarity: Rarity
}

interface MonsterWithDetails extends Monster {
    weight: number
}

type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades'

type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'

interface Card {
    suit: Suit
    rank: Rank
}

interface SupabaseResponse<T> {
    data: T | null
    error: unknown | null
}
