import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../types/comment";

const initialState: Comment[] = [
    // this should get data from database
]

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment(state, action) {
            state.push(action.payload)
        },
        removeComment(state, action) {
            state.filter(comment => comment.id !== action.payload)
        }
    }
})

export const { addComment, removeComment } = commentsSlice.actions
export default commentsSlice.reducer