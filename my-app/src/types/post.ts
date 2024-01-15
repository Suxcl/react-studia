import { Comment } from "../types/comment";
export type Post = {
    id: number
    authorId: number
    title: string
    body: string
    likes: number
    dislikes: number
    comments: Comment[]
}