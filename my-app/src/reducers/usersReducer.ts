import type { User } from './../types/user';


import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'


interface UsersState {
    users: User[] 
    init_status: true|false,
  }

const initialState: UsersState = {
    init_status: true,
    users: [] 
};


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action) {
            if(state.init_status) {
                state.users = action.payload
                state.init_status = false
            }
        },
        addUser(state, action) {       
            console.log("adding new user to redux")     
            console.log(action.payload)
            state.users.push(action.payload)
        },
        removeUser(state, action) {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        updateUser(state, action) {
            let User:User = action.payload
            let index = state.users.findIndex(user => user.id === action.payload.id)
            state.users[index] = User
        }
    },
})

export const { addUser, removeUser, updateUser, setUsers} = userSlice.actions
export default userSlice.reducer

