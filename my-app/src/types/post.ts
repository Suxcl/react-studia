import { Comment } from "../types/comment";
export type Post = {
    id: number
    authorId: number
    authorUsername: string
    title: string
    body: string
    likes: number
    userIdLikes: number[]
    dislikes: number
    userIdDislikes: number[]
    comments: Comment[]
    commentsCount: number
    createdAt: string
    updatedAt: string

}