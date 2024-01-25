export type Invite = {
    id: string
    senderId: string
    receiverId: string
    status: InviteStatus
}

export enum InviteStatus{
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED"
}