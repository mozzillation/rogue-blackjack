const weights: Record<Rarity, number> = {
    common: 50 / 100,
    uncommon: 20 / 100,
    rare: 10 / 100,
    epic: 5 / 100,
    legendary: 2 / 100,
    mythic: 1 / 10,
}

export const extendsMonstersWithDetails = (monsters: Monster[]): MonsterWithDetails[] => {
    return monsters.map((monster) => {
        const weight = weights[monster.rarity]

        return {
            ...monster,
            weight,
        }
    })
}
