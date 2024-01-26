import axios, { AxiosResponse } from 'axios';
import { Invite } from '../types/invite';


const URL = 'http://51.83.130.126:3000/invites_react'

interface Invites{
    invites:Invite[]
}

export const getInvites = async() => {
    try{
        const response: AxiosResponse<Invites> = await axios.get<Invites>(`${URL}`)
        return response.data
    }catch(error){
        return []
    }
}

export const postInvite = async(invite:Invite) => {
    await axios.post(`${URL}`, {
        id: invite.id,
        senderId: invite.senderId,
        senderUsername: invite.senderUsername,
        receiverId: invite.receiverId,
        receiverUsername: invite.receiverUsername,
        status: invite.status
    }).then(response => {
        console.log("post invite successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}

export const putInvite = async(invite:Invite) => {
    await axios.patch(`${URL}/${invite.id}`, {
        id: invite.id,
        senderId: invite.senderId,
        senderUsername: invite.senderUsername,
        receiverId: invite.receiverId,
        receiverUsername: invite.receiverUsername,
        status: invite.status
    }).then(response => {
        console.log("patch invite successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })    
}

export const deleteInvite = async(id:string) => {   
    await axios.delete(`${URL}/${id}`).then(response => {
        console.log("delete invite successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}