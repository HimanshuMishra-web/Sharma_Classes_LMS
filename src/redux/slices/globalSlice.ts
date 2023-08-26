import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface globalState {
    loading: boolean
}

const initialState: globalState = {
    loading: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = globalSlice.actions

export default globalSlice.reducer