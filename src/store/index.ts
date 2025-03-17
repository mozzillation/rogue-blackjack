import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducers/game-reducer'

const combinedReducers = combineReducers({
    game: gameReducer,
})

export const makeStore = () => {
    return configureStore({
        reducer: combinedReducers,
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
