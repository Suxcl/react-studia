import { createSlice } from "@reduxjs/toolkit";
import { Invite } from "../types/invite";

interface InvitesState {
    invites: Invite[]
    init_status: true|false,
}

const initialState: InvitesState = {
    init_status: true,
    invites: []
}

export const invitesSlice = createSlice({
    name: 'invites',
    initialState,
    reducers: {
        setInvites(state, action) {
            if(state.init_status) {
                state.invites = action.payload
                state.init_status = false
            }
        },
        addInvite(state, action) {
            console.log("adding new invite to redux")
            console.log(action.payload)
            state.invites.push(action.payload)
        },
        updateInvite(state, action) {
            let Invite:Invite = action.payload
            let index = state.invites.findIndex(invite => invite.id === action.payload.id)
            state.invites[index] = Invite
        }
        
    }
})

export const { addInvite, updateInvite, setInvites } = invitesSlice.actions
export default invitesSlice.reducer