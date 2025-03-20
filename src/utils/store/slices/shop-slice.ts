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
const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addHealth: (state, action: PayloadAction<number>) => {
         
        },
    },
})

export const { setMonsters, setLoading, setError, resetMonsters } = shopSlice.actions

const shopReducer = shopSlice.reducer

export default shopReducer
