// game-utils.ts

import { GameState } from '../reducers/game-reducer'

export const calculateRoundOutcome = (playerScore: number, dealerScore: number) => {
    if (playerScore === 21) return 'win'
    if (playerScore > 21) return 'lose'
    if (dealerScore > 21) return 'win'
    if (playerScore > dealerScore) return 'win'
    if (playerScore < dealerScore) return 'lose'
    return 'tie'
}

export const updatePlayerCoinsAndHealth = (state: GameState, outcome: string) => {
    const newState = { ...state }
    if (outcome === 'win') {
        newState.player.coins += 1
    } else if (outcome === 'lose') {
        newState.player.health -= 1
    }
    return newState
}

export const handleGameOver = (state: GameState) => {
    if (state.player.health <= 0) {
        return { ...state, status: 'game-over' }
    }
    return state
}

export const drawCard = (deck: Card[], who: 'player' | 'dealer') => {
    const drawnCard = deck.shift() // Efficiently removes first card
    if (drawnCard) {
        return who === 'player' ? { player: drawnCard } : { dealer: drawnCard }
    }
    return {}
}

export const logOutcome = (state: GameState) => {
    const { level } = state

    return {
        enemyName: level.enemy?.name,
        playerScore: level.player.score,
        dealerScore: level.dealer.score,
        level: level.index,
    }
}
