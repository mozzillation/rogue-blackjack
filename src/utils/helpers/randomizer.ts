export const getRandomMonster = (monsters: MonsterWithDetails[]): MonsterWithDetails => {
    const totalWeight = monsters.reduce((sum, monster) => sum + monster.weight!, 0)
    let randomWeight = Math.random() * totalWeight

    for (const monster of monsters) {
        randomWeight -= monster.weight!
        if (randomWeight <= 0) {
            return monster
        }
    }

    return monsters[0] // Fallback to the first monster in case of error
}
