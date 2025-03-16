import { deck } from '@/entities/deck'
import { CombinedGameActionsType } from '../actions/game-actions'
import { calculateScore } from '@/libs/math'
import { produce } from 'immer'

const gameStatus = {
    IDLE: 'idle',
    PLAYING: 'playing',
    SHOPPING: 'shopping',
    GAME_OVER: 'game-over',
}

const levelStatus = {
    IDLE: 'idle',
    PLAYING: 'playing',
    TIE: 'tie',
    WON: 'won',
    LOST: 'lost',
}

export type GameState = {
    status: (typeof gameStatus)[keyof typeof gameStatus]
    seed: null | string
    level: {
        index: number
        enemy: null | Enemy
        status: (typeof levelStatus)[keyof typeof levelStatus]
        round: number
        deck: Card[]
        player: {
            hand: Card[]
            score: number
        }
        dealer: {
            hand: Card[]
            score: number
        }
        isProcessing: boolean
    }
    player: {
        coins: number
        health: number
        inventory: string[]
    }
}

// Initial State
const initialState: GameState = {
    seed: null,
    status: gameStatus.IDLE,
    level: {
        index: 0,
        enemy: null,
        round: 0,
        status: levelStatus.IDLE,
        deck: [],
        player: { hand: [], score: 0 },
        dealer: { hand: [], score: 0 },
        isProcessing: true,
    },
    player: { coins: 5, health: 3, inventory: [] },
}

// Game Reducer
const gameReducer = (
    state: GameState = initialState,
    action: CombinedGameActionsType,
): GameState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'SET_SEED':
                return { ...initialState, seed: action.payload.seed }

            case 'NEW_LEVEL': {
                Object.assign(draft.level, {
                    index: action.payload.nextLevel,
                    enemy: action.payload.enemy,
                    status: levelStatus.IDLE,
                    round: 0,
                })
                break
            }

            case 'NEXT_ROUND': {
                draft.level.deck = deck().shuffle
                draft.level.round += 1
                draft.level.status = levelStatus.PLAYING
                break
            }

            case 'DEAL': {
                const [playerCard1, dealerCard1, playerCard2, dealerCard2] = draft.level.deck
                draft.level.deck.splice(0, 4)
                draft.level.player.hand = [playerCard1, playerCard2]
                draft.level.dealer.hand = [dealerCard1, dealerCard2]
                break
            }

            case 'TALLY': {
                draft.level.player.score = calculateScore(draft.level.player.hand)
                draft.level.dealer.score = calculateScore(draft.level.dealer.hand)
                break
            }

            case 'OUTCOME': {
                const { player, dealer } = draft.level

                if (player.score === 21) {
                    // Blackjack → Instant win
                    draft.level.status = levelStatus.WON
                    draft.player.coins += 1
                } else if (player.score > 21) {
                    // Player busts → Lose
                    draft.level.status = levelStatus.LOST
                    draft.player.health -= 1
                } else if (dealer.score > 21) {
                    // Dealer busts → Win
                    draft.level.status = levelStatus.WON
                    draft.player.coins += 1
                } else if (player.score > dealer.score) {
                    // Higher score → Win
                    draft.level.status = levelStatus.WON
                    draft.player.coins += 1
                } else if (player.score < dealer.score) {
                    // Lower score → Lose
                    draft.level.status = levelStatus.LOST
                    draft.player.health -= 1
                } else {
                    // Tie (Push)
                    draft.level.status = levelStatus.TIE
                }

                // Check for Game Over
                if (draft.player.health <= 0) {
                    draft.status = gameStatus.GAME_OVER
                }
                break
            }

            case 'HIT': {
                const drawnCard = draft.level.deck.shift() // Efficiently removes first card

                if (drawnCard) {
                    if (action.payload.who === 'player') {
                        draft.level.player.hand.push(drawnCard)
                    } else if (action.payload.who === 'dealer') {
                        draft.level.dealer.hand.push(drawnCard)
                    }
                }
                break
            }

            case 'UPDATE_PROGRESS': {
                draft.level.isProcessing = action.payload.boolean
                break
            }

            default:
                return state
        }
    })
}

export default gameReducer
