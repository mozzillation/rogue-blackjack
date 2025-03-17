import { generateEnemyLevel } from '@/entities/enemies'
import { AppDispatch, RootState } from '..'

// Types

type SeedInitActionType = {
    type: 'SET_SEED'
    payload: {
        seed: string
    }
}

type NewLevelActionType = {
    type: 'NEW_LEVEL'
    payload: {
        enemy: Enemy
        nextLevel: number
    }
}

type NextRoundActionType = {
    type: 'NEXT_ROUND'
}

type DealActionType = {
    type: 'DEAL'
}

type TallyActionType = {
    type: 'TALLY'
}

type OutcomeActionType = {
    type: 'OUTCOME'
}

type HitActionType = {
    type: 'HIT'
    payload: {
        who: 'player' | 'dealer'
    }
}

type UpdateProgressActionType = {
    type: 'UPDATE_PROGRESS'
    payload: {
        boolean: boolean
    }
}

// Combined Action Types

export type CombinedGameActionsType =
    | SeedInitActionType
    | NewLevelActionType
    | NextRoundActionType
    | DealActionType
    | TallyActionType
    | OutcomeActionType
    | HitActionType
    | UpdateProgressActionType

// Actions

export const setSeed = (seed: string) => (dispatch: AppDispatch) => {
    dispatch({ type: 'SET_SEED', payload: { seed } })
}

export const generateNewLevel = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { seed, level } = getState().game

    if (!seed) return

    const nextLevelIndex = level.index + 1

    dispatch({
        type: 'NEW_LEVEL',
        payload: {
            enemy: generateEnemyLevel(seed, nextLevelIndex),
            nextLevel: nextLevelIndex,
        },
    })
}

export const increaseRound = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'NEXT_ROUND',
    })
}

export const deal = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'DEAL',
    })
}

export const tally = () => (dispatch: AppDispatch) => {
    dispatch({ type: 'TALLY' })
}

export const check = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { player } = getState().game.level

    if (player.score >= 21) {
        dispatch(outcome())
    } else {
        dispatch(updateProgress(false))
    }
}

export const outcome = () => (dispatch: AppDispatch) => {
    const timeout = 1000

    const delayOutcome = () => {
        setTimeout(() => {
            dispatch({ type: 'OUTCOME' })
        }, timeout)
    }

    delayOutcome()
}

export const hit = (who: 'player' | 'dealer') => (dispatch: AppDispatch) => {
    dispatch({ type: 'HIT', payload: { who } })
}
export const stand = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
        level: { dealer },
    } = getState().game
    const timeout = 1000

    const delayHit = () =>
        setTimeout(() => {
            dispatch(hit('dealer'))
            dispatch(tally())
            dispatch(stand()) // Continue until dealer reaches at least 17
        }, timeout)

    if (dealer.score < 17) {
        delayHit() // Keep hitting until at least 17
    } else {
        dispatch(outcome()) // End the round
    }
}

export const updateProgress = (boolean: boolean) => (dispatch: AppDispatch) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: { boolean } })
}

// Combined Actions

export const startGame = (seed: string) => (dispatch: AppDispatch) => {
    dispatch(setSeed(seed))
    dispatch(generateNewLevel())
}

export const setNextRound = () => (dispatch: AppDispatch) => {
    dispatch(increaseRound())
    dispatch(deal())
    dispatch(tally())
    dispatch(check())
}

export const startLevel = () => (dispatch: AppDispatch) => {
    dispatch(setNextRound())
}

export const getNewCard = (who: 'player' | 'dealer') => (dispatch: AppDispatch) => {
    dispatch(updateProgress(true))
    dispatch(hit(who))
    dispatch(tally())
    dispatch(check())
}
