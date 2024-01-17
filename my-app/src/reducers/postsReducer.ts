import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../types/post";

const initialState: Post[] = [
    // this should get data from database
]

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action) {
            state.push(action.payload)
        },
        removePost(state, action) {
            state.filter(post => post.id !== action.payload)
        }
    }
})

export const { addPost, removePost } = postSlice.actions
export default postSlice.reducer