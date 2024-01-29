export type Post = {
    id: string
    authorId: string
    authorUsername: string
    title: string
    body: string
    likes: number
    userIdLikes: string[]
    dislikes: number
    userIdDislikes: string[]
    createdAt: string
    updatedAt: string

}