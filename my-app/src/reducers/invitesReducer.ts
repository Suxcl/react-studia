import { createSlice } from "@reduxjs/toolkit";
import { Invite } from "../types/invite";

const initialState: Invite[] = [
    // this should get data from database
]

export const invitesSlice = createSlice({
    name: 'invites',
    initialState,
    reducers: {
        addInvite(state, action) {
            state.push(action.payload)
        },
        removeInvite(state, action) {
            state.filter(invite => invite.id !== action.payload)
        }
    }
})

export const { addInvite, removeInvite } = invitesSlice.actions
export default invitesSlice.reducer