export type Invite = {
    id: number
    senderId: number
    receiverId: number
    status: InviteStatus
}

export enum InviteStatus{
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED"
}