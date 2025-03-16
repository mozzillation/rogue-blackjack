import { mulberry32, stringToSeed } from '@/libs/randomizer'

const generateProceduralWeight = (health: number, powerFactor = 1.5): number => {
    return parseFloat((1 / Math.pow(health, powerFactor)).toFixed(4)) // Procedural weight formula
}

const enemyRawData: Record<EnemyType, EnemyRawEntry> = {
    goblin: {
        health: 1,
        modifiers: {
            malus: { type: 'lose-health', amount: 2 },
        },
        names: [
            'Sneaky Pete',
            'Grubby Fingers',
            'Nosepicker',
            'Ratface',
            'Gnashtooth',
            'Bogwart',
            'Snotling',
            'Grimble',
            'Stinkeye',
            'Weaselnose',
            'Scratchnail',
            'Gobbler',
            'Squinteye',
            'Muckgrub',
            'Snickersneeze',
        ],
    },
    skeleton: {
        health: 1,
        modifiers: {
            malus: { type: 'lose-health', amount: 2 },
        },
        names: [
            'Rattles',
            'Boney Tony',
            'Skully',
            'Marrow Mitch',
            'Ribcage Rick',
            'Calcium Carl',
            'Clattering Cathy',
            'Osseous Oscar',
            'Skeletal Sammy',
            'Jawbone Jim',
            'Tibia Tina',
            'Vertebrae Vince',
            'Phalanges Phil',
            'Cranium Craig',
            'Femur Fiona',
        ],
    },
    slime: {
        health: 1,
        modifiers: {
            malus: { type: 'lose-all-coins' },
        },
        names: [
            'Gloopy',
            'Slurper',
            'Ooze-Ball',
            'Slick Rick',
            'Blob Bob',
            'Slimey McSlimerson',
            'Goop Troop',
            'Mucus Max',
            'Jelly Belly',
            'Slippery Sam',
            'Viscous Vince',
            'Globule Gary',
            'Sludge Pudge',
            'Sticky Icky',
            'Plasma Pete',
        ],
    },
    ghost: {
        health: 1,
        modifiers: {
            malus: { type: 'instant-game-over' },
        },
        names: [
            'Whisper',
            'Phantom Phil',
            'Spooky Sue',
            'Ethereal Ethan',
            'Misty Morgan',
            'Vapor Vince',
            'Spectral Sally',
            'Ghastly Gus',
            'Wispy Wendy',
            'Haunting Harry',
            'Eerie Erica',
            'Boo-Berry',
            'Floaty Fred',
            'Transparent Tina',
            'Ghostly Greg',
        ],
    },
    robot: {
        health: 2,
        modifiers: {
            malus: null,
        },
        names: [
            'Unit-X1',
            'Servo-9000',
            'Cog-Bot',
            'Mecha-Tron',
            'Robo-Zap',
            'Circuitry',
            'Binary Blaster',
            'Nano-Byte',
            'Cyber-Core',
            'Diode Destroyer',
            'Pixel Puncher',
            'Giga-Gear',
            'Techno-Titan',
            'Quantum Quasher',
            'Volt-Vex',
        ],
    },
    orc: {
        health: 3,
        modifiers: {
            malus: { type: 'lose-coins', amount: 3 },
        },
        names: [
            'Groknak the Destroyer',
            'Throg Skullcrusher',
            'Urgokh Bonecruncher',
            'Mogra Bloodaxe',
            'Grommash Hellscream',
            'Durotan Frostwolf',
            'Gorrok Ironfist',
            'Thrakk Warsong',
            "Zug'zug Headtaker",
            "Gul'dan Shadowmoon",
            'Nazgrel Frostblade',
            'Kargath Bladefist',
            'Orgrim Doomhammer',
            'Thrall Earthshaker',
            'Garrosh Hellscream',
        ],
    },
    apex: {
        health: 5,
        modifiers: {
            malus: { type: 'instant-game-over' },
        },
        names: [
            'Overlord Omega',
            'Doomfist the Annihilator',
            'Shadowmancer Supreme',
            'Titan of Terror',
            'Apocalypse Alpha',
            'Nemesis Prime',
            'Chaos Incarnate',
            "Oblivion's Herald",
            'Ragnarok the Unbound',
            'Void Sovereign',
            "Cataclysm's Avatar",
            'Harbinger of Despair',
            "Eternity's End",
            'Nightmare Unleashed',
            'Cosmic Conqueror',
        ],
    },
}

// Generate Enemy according to type and seed

const generateEnemy = (type: EnemyType, random: () => number): Enemy => {
    const data = enemyRawData[type]
    return {
        type,
        name: data.names[Math.floor(random() * data.names.length)], // Random name
        health: data.health,
        weight: generateProceduralWeight(data.health), // Auto-generated weight
        modifiers: {
            malus: data.modifiers.malus,
        },
    }
}

// Utility function to pick a random enemy based on weight
const getRandomEnemy = (enemies: Enemy[], random: () => number): Enemy => {
    const totalWeight = enemies.reduce((sum, e) => sum + e.weight, 0)
    let rand = random() * totalWeight

    for (const enemy of enemies) {
        if (rand < enemy.weight) return enemy
        rand -= enemy.weight
    }

    return enemies[0] // Fallback (should never happen)
}

export const generateEnemyLevel = (seed: string, level: number): Enemy => {
    const numericSeed = stringToSeed(seed) + level // Ensure different results per level
    const random = mulberry32(numericSeed) // Create seeded PRNG with level variation

    // Get a weighted random enemy
    const weightedEnemies = Object.entries(enemyRawData).map(([type]) =>
        generateEnemy(type as EnemyType, random),
    )

    return getRandomEnemy(weightedEnemies, random)
}

// Enemy Generator Object
export const enemyGenerator = (seed: string, index: number) => {
    return generateEnemyLevel(seed, index)
}
