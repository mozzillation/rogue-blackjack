import { generateEnemyLevel } from '../enemies'

// generateEnemyLevel()

describe('generateEnemyLevel()', () => {
    it('should return the same enemy for the same seed and level', () => {
        const seed = 'test-seed'
        const level = 1

        const enemy1 = generateEnemyLevel(seed, level)
        const enemy2 = generateEnemyLevel(seed, level)

        expect(enemy1).toEqual(enemy2)
    })

    it('should return different enemies for different levels', () => {
        const seed = 'test-seed'
        const enemy1 = generateEnemyLevel(seed, 1)
        const enemy2 = generateEnemyLevel(seed, 2)

        expect(enemy1).not.toEqual(enemy2)
    })

    it('should return different enemies for different seeds', () => {
        const level = 1
        const enemy1 = generateEnemyLevel('seed1', level)
        const enemy2 = generateEnemyLevel('seed2', level)

        expect(enemy1).not.toEqual(enemy2)
    })

    it('should return an enemy with valid properties', () => {
        const enemy = generateEnemyLevel('test-seed', 1)

        expect(enemy).toHaveProperty('type')
        expect(enemy).toHaveProperty('name')
        expect(enemy).toHaveProperty('health')
        expect(enemy).toHaveProperty('weight')
        expect(typeof enemy.type).toBe('string')
        expect(typeof enemy.name).toBe('string')
        expect(typeof enemy.health).toBe('number')
        expect(typeof enemy.weight).toBe('number')
    })

    it('should generate weighted enemies correctly', () => {
        const seed = 'test-seed'
        const level = 5

        const enemy = generateEnemyLevel(seed, level)

        // Stronger enemies should appear less frequently
        if (enemy.health >= 3) {
            expect(['orc', 'apex']).toContain(enemy.type)
        } else {
            expect(['goblin', 'skeleton', 'slime', 'ghost', 'robot']).toContain(enemy.type)
        }
    })
})
