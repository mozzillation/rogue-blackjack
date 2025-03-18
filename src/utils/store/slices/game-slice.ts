import { calculateScore, createDeck } from '@/utils/helpers/deck'
import { getRandomMonster } from '@/utils/helpers/randomizer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

enum GameStage {
    IDLE = 'idle',
    DEALING = 'dealing',
    CALCULATING = 'calculating',
    PLAYING = 'playing',
    HITTING = 'hitting',
    STANDING = 'standing',
    OUTCOME = 'outcome',
}

type PlayerStats = {
    score: number
    hand: Card[]
}

// Define initial state for the monsters
type GameState = {
    level: number
    monster: MonsterWithDetails | null
    stage: GameStage | null
    deck: Card[]
    session: {
        health: number
        coins: number
    }
    player: PlayerStats
    dealer: PlayerStats
}

const initialState: GameState = {
    level: 0,
    monster: null,
    session: {
        health: 3,
        coins: 3,
    },
    deck: [],
    stage: null,
    player: {
        score: 0,
        hand: [],
    },
    dealer: {
        score: 0,
        hand: [],
    },
}

// Define an async thunk
export const dealNewLevel = createAsyncThunk(
    'game/dealNewLevel',
    async (_, { dispatch, getState }) => {
        dispatch(gameSlice.actions.deal())
        dispatch(gameSlice.actions.tally())

        const {
            game: { player },
        } = getState() as RootState

        const timeout = 1000

        const delayStand = () => {
            setTimeout(() => {
                dispatch(handlePlayerStand())
            }, timeout)
        }

        if (player.score === 21) {
            // Blackjack
            delayStand()
        } else {
            dispatch(gameSlice.actions.updateStage(GameStage.PLAYING))
        }
    },
)

export const handlePlayerHit = createAsyncThunk(
    'game/handlePlayerHit',
    async (_, { dispatch, getState }) => {
        dispatch(gameSlice.actions.hit('player'))
        dispatch(gameSlice.actions.tally())

        const {
            game: { player },
        } = getState() as RootState

        const timeout = 1000

        const delayStand = () => {
            setTimeout(() => {
                dispatch(handlePlayerStand())
            }, timeout)
        }

        const delayOutcome = () => {
            setTimeout(() => {
                dispatch(gameSlice.actions.outcome())
            }, timeout)
        }

        if (player.score === 21) {
            // Blackjack
            delayStand()
        } else if (player.score > 21) {
            delayOutcome()
        }
    },
)

export const handlePlayerStand = createAsyncThunk(
    'game/handlePlayerStand',
    async (_, { dispatch, getState }) => {
        const {
            game: { dealer, player },
        } = getState() as RootState

        const timeout = 1000

        const delayDealerHit = () => {
            setTimeout(() => {
                dispatch(gameSlice.actions.hit('dealer'))
                dispatch(gameSlice.actions.tally())
                dispatch(handlePlayerStand())
            }, timeout)
        }

        const delayOutcome = () => {
            setTimeout(() => {
                dispatch(gameSlice.actions.outcome())
            }, timeout)
        }

        dispatch(gameSlice.actions.stand())

        if (dealer.score <= 17 && dealer.score < player.score) {
            delayDealerHit()
        } else {
            delayOutcome()
        }
    },
)

// export const stand = () => (dispatch: AppDispatch, getState: () => RootState) => {
//     const {
//         level: { dealer, player },
//     } = getState().game
//     const timeout = 1000

//     const delayHit = () =>
//         setTimeout(() => {
//             dispatch(hit('dealer'))
//             dispatch(tally())
//             dispatch(stand()) // Continue until dealer reaches at least 17
//         }, timeout)

//     if (dealer.score < 17 && dealer.score < player.score) {
//         delayHit() // Keep hitting until at least 17
//     } else {
//         dispatch(outcome()) // End the round
//     }
// }

// Create slice
const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        playNextLevel: (state, action: PayloadAction<MonsterWithDetails[]>) => {
            state.level = 1
            state.stage = GameStage.IDLE
            state.monster = getRandomMonster(action.payload)
            state.session.coins = 3
            state.session.health = 3
            state.deck = createDeck()
        },
        deal: (state) => {
            const [playerCard1, dealerCard1, playerCard2, dealerCard2] = state.deck

            state.stage = GameStage.DEALING
            state.player.hand = [playerCard1, playerCard2]
            state.dealer.hand = [dealerCard1, dealerCard2]
            state.deck = state.deck.slice(4)
        },
        tally: (state) => {
            state.stage = GameStage.CALCULATING
            state.player.score = calculateScore(state.player.hand)
            state.dealer.score = calculateScore(state.dealer.hand)
        },
        hit: (state, action: PayloadAction<'player' | 'dealer'>) => {
            const [newCard] = state.deck

            if (action.payload === 'player') {
                state.stage = GameStage.HITTING
            }

            state[action.payload].hand.push(newCard)
            state.deck = state.deck.slice(1)
        },
        stand: (state) => {
            state.stage = GameStage.STANDING
        },
        outcome: (state) => {
            state.stage = GameStage.OUTCOME
        },
        updateStage: (state, action: PayloadAction<GameStage>) => {
            state.stage = action.payload
        },
    },
})

export const { playNextLevel, deal, hit, outcome, tally, stand } = gameSlice.actions

const gameReducer = gameSlice.reducer

export default gameReducer
