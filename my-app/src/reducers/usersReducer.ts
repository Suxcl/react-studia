import type { User } from './../types/user';
import { createSlice } from '@reduxjs/toolkit'


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
        },
        // {user1Id:string, user2Id:string}
        addFriend(state, action) {
            let index = state.users.findIndex(user => user.id === action.payload.user1Id)
            let friendIndex = state.users.findIndex(user => user.id === action.payload.user2Id)
            state.users[index].friends.push(action.payload.user2Id)
            state.users[friendIndex].friends.push(action.payload.user1Id)
        },
        removeFriend(state, action) {
            let index = state.users.findIndex(user => user.id === action.payload.user1Id)
            let friendIndex = state.users.findIndex(user => user.id === action.payload.user2Id)
            state.users[index].friends = state.users[index].friends.filter(friendId => friendId !== action.payload.user2Id)   
            state.users[friendIndex].friends = state.users[friendIndex].friends.filter(friendId => friendId !== action.payload.user1Id)
        }
    },
})

export const { addUser, removeUser, updateUser, setUsers, addFriend, removeFriend} = userSlice.actions
export default userSlice.reducer

