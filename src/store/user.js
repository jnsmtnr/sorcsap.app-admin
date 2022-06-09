import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    token: null,
    expiresAt: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email
            state.token = action.payload.token
            state.expiresAt = action.payload.expiresAt
        },
        resetUser: (state) => {
            state.email = null
            state.token = null
            state.expiresAt = null
        }
    }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
