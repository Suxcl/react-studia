import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { useId } from 'react';
import FormDialog from '../components/editUser';
const initialState: User[] = [
    // this should get data from database
]

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action) {
            let newUser:User = action.payload
            // eslint-disable-next-line react-hooks/rules-of-hooks
            newUser.id = useId()
            state.push(action.payload)
        },
        removeUser(state, action) {
            state.filter(user => user.id !== action.payload)
        },
        updateUser(state, action) {
            FormDialog()
            // let User:User = action.payload
            // let index = state.findIndex(user => user.id === action.payload.id)
            // state[index] = User
        }
    }
})

export const { addUser, removeUser, updateUser} = userSlice.actions
export default userSlice.reducer