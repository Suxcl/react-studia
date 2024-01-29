import type { User } from "../types/user";
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    user: User | null
    someoneIsLogged: boolean
}

const initialState: AuthState = {
    user: null,
    someoneIsLogged: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
            state.someoneIsLogged = true
        },
        logout(state) {
            state.user = null
            state.someoneIsLogged = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer