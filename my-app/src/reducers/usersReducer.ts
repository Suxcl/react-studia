import { User } from './../types/user';
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import FormDialog from '../components/editUser';
import { useId } from 'react';
import { RootState } from '../store';

type status = 'pending' | 'fulfilled' | 'rejected'

// Define the type of the state
interface UsersState {
    status: status;
    users: User[] // Replace 'any' with the actual type of users
  }
  
  const initialState: UsersState = {
    status: 'pending',
    users: [],
  };

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async () => {
        try{
            const response = await fetch('http://51.83.130.126:3000/users');
            const data = await response.json();
            return data;
        }catch(error){
            console.log(error);
        }
    }
)


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action) {
            if (state.status === 'fulfilled'){
                let newUser:User = action.payload
                // eslint-disable-next-line react-hooks/rules-of-hooks
                //newUser.id = useId()
                newUser.name = action.payload.name
                state.users.push(action.payload)
            }
        },
        removeUser(state, action) {
            // state.users = state.users.filter(user => user.id !== action.payload)
        },
        updateUser(state, action) {
            FormDialog()
            let User:User = action.payload
            let index = state.users.findIndex(user => user.id === action.payload.id)
            state.users[index] = User
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.status = 'pending'
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {

            action.payload.forEach((element: any) => {
                //console.log(JSON.parse(element.body))
                let newUser = element.body
                // console.log(newUser)
                state.users.push(JSON.parse(newUser))
            });
            //state.users = action.payload;
            state.status = 'fulfilled'
        })
    }
})

export const { addUser, removeUser, updateUser} = userSlice.actions
export default userSlice.reducer

export const selectUsers = (state:RootState) => state.user.users