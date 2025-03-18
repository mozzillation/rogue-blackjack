import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define initial state for the monsters
type MonsterState = {
    data: MonsterWithDetails[]
    loading: boolean
    error: string | null
}

const initialState: MonsterState = {
    data: [],
    loading: false,
    error: null,
}

// Create slice
const monsterSlice = createSlice({
    name: 'monsters',
    initialState,
    reducers: {
        setMonsters: (state, action: PayloadAction<MonsterWithDetails[]>) => {
            state.data = action.payload
            state.loading = false
            state.error = null
        },
        setLoading: (state) => {
            state.loading = true
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
        resetMonsters: (state) => {
            state.data = []
            state.loading = false
            state.error = null
        },
    },
})

export const { setMonsters, setLoading, setError, resetMonsters } = monsterSlice.actions

const monsterReducer = monsterSlice.reducer

export default monsterReducer
