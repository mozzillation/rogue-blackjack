import { calculateScore, createDeck } from '@/utils/helpers/deck'
import { getRandomMonster } from '@/utils/helpers/randomizer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

enum GameView {
    INTRO = 'intro',
    TABLE = 'table',
    OUTCOME = 'outcome',
    GAMEOVER = 'gameover',
    SHOP = 'shop',
}

enum GameStage {
    IDLE = 'idle',
    DEALING = 'dealing',
    CALCULATING = 'calculating',
    PLAYING = 'playing',
    HITTING = 'hitting',
    STANDING = 'standing',
    OUTCOMING = 'outcoming',
}

enum GameOutcome {
    WON = 'won',
    LOST = 'lost',
    TIE = 'tie',
    BLACKJACK = 'blackjack',
}

type PlayerStats = {
    score: number
    hand: Card[]
}

// Define initial state for the monsters
type GameState = {
    dungeon: MonsterWithDetails[]
    level: number
    view: GameView
    monster: MonsterWithDetails | null
    stage: GameStage | null
    deck: Card[]
    session: {
        health: number
        coins: number
    }
    player: PlayerStats
    dealer: PlayerStats
    outcome: GameOutcome | null
}

const initialState: GameState = {
    dungeon: [],
    level: 0,
    view: GameView.INTRO,
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
    outcome: null,
}

export const generateSession = createAsyncThunk(
    'game/generateSession',
    async (monsters: MonsterWithDetails[], { dispatch }) => {
        dispatch(gameSlice.actions.seedSession(monsters))
        dispatch(gameSlice.actions.nextLevel())
    },
)

// Define an async thunk
export const dealNewLevel = createAsyncThunk(
    'game/dealNewLevel',
    async (_, { dispatch, getState }) => {
        dispatch(gameSlice.actions.updateView(GameView.TABLE))
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

        const delayUpdateStage = () => {
            setTimeout(() => {
                dispatch(gameSlice.actions.updateStage(GameStage.PLAYING))
            }, timeout)
        }

        if (player.score === 21) {
            // Blackjack
            delayStand()
        } else {
            delayUpdateStage()
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

        const delayUpdateStage = () => {
            setTimeout(() => {
                dispatch(gameSlice.actions.updateStage(GameStage.PLAYING))
            }, timeout / 2)
        }

        if (player.score === 21) {
            // Blackjack
            delayStand()
        } else if (player.score > 21) {
            delayOutcome()
        } else {
            delayUpdateStage()
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

// Create slice
const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
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
            state.stage = GameStage.OUTCOMING

            if (state.player.score === 21 && state.dealer.score !== 21) {
                // Blackjack → Special win
                state.outcome = GameOutcome.BLACKJACK
                state.session.coins += 3
                state.session.health += 1
            } else if (state.player.score > 21) {
                // Player busts → Lose
                state.outcome = GameOutcome.LOST
                state.session.health -= 1
            } else if (state.dealer.score > 21) {
                // Dealer busts → Win
                state.outcome = GameOutcome.WON
                state.session.coins += 1
            } else if (state.player.score > state.dealer.score) {
                // Higher score → Win
                state.outcome = GameOutcome.WON
                state.session.coins += 1
            } else if (state.player.score < state.dealer.score) {
                // Lower score → Lose
                state.outcome = GameOutcome.LOST
                state.session.health -= 1
            } else {
                // Tie (Push)
                state.outcome = GameOutcome.TIE
            }

            // Check for Game Over
            if (state.session.health <= 0) {
                state.view = GameView.GAMEOVER
            } else {
                state.view = GameView.OUTCOME
            }
        },
        seedSession: (state, action: PayloadAction<MonsterWithDetails[]>) => {
            state.dungeon = action.payload
            state.level = 0
            state.session.coins = 3
            state.session.health = 3
        },
        retry: (state) => {
            state.level = 1
            state.stage = GameStage.IDLE
            state.view = GameView.INTRO
            state.monster = getRandomMonster(state.dungeon)
            state.deck = createDeck()
            state.outcome = null
            state.session.coins = 3
            state.session.health = 3
        },
        nextLevel: (state) => {
            state.level += 1
            state.stage = GameStage.IDLE
            state.view = GameView.INTRO
            state.monster = getRandomMonster(state.dungeon)
            state.deck = createDeck()
            state.outcome = null
        },
        visitShop: (state) => {
            state.view = GameView.SHOP
        },
        updateView: (state, action: PayloadAction<GameView>) => {
            state.view = action.payload
        },
        updateStage: (state, action: PayloadAction<GameStage>) => {
            state.stage = action.payload
        },
    },
})

export const {
    deal,
    hit,
    outcome,
    tally,
    stand,
    updateView,
    updateStage,
    seedSession,
    nextLevel,
    visitShop,
    retry,
} = gameSlice.actions

const gameReducer = gameSlice.reducer

export default gameReducer
