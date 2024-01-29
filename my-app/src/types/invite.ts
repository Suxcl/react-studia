export type Invite = {
    id: string
    senderId: string
    senderUsername: string
    receiverId: string
    receiverUsername: string
    status: InviteStatus
}

export enum InviteStatus{
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED"
}