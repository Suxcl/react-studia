import axios, { AxiosResponse } from 'axios';
import { Comment } from '../types/comment';


const URL = 'http://51.83.130.126:3000/comments_react'



export const getComments = async() => {
    try{
        console.log(URL)
        const response: AxiosResponse<Comment[]> = await axios.get<Comment[]>(`${URL}`)
        console.log(response.data)
        return response.data
    }catch(error){
        return []
    }
}

export const postComment = async(comment:Comment) => {
    await axios.post(`${URL}`, {
        id: comment.id,
        authorId: comment.authorId,
        authorUsername: comment.authorUsername,
        postId: comment.postId,
        body: comment.body
    }).then(response => {
        console.log("post comment successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}

export const putComment = async(comment:Comment) => {
    await axios.patch(`${URL}/${comment.id}`, {
        id: comment.id,
        authorId: comment.authorId,
        authorUsername: comment.authorUsername,
        postId: comment.postId,
        body: comment.body
    }).then(response => {
        console.log("patch comment successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}

export const deleteComment = async(id:string) => {
    await axios.delete(`${URL}/${id}`).then(response => {
        console.log("delete comment successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}