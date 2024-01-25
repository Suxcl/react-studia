import axios, { AxiosResponse } from 'axios';
import { Post } from '../types/post';

const URL = 'http://51.83.130.126:3000/posts_react'

interface Posts{
    posts:Post[]
}

export const getPosts = async() => {
    try{
        console.log(URL)
        const response: AxiosResponse<Post[]> = await axios.get<Post[]>(`${URL}`)
        console.log("getPosts", response.data)
        return response.data
    }catch(error){
        console.log(error)
        
        return [] as Post[]
    }
}

export const postPost = async(post:Post) => {
    await axios.post(`${URL}`, {
        id: post.id,
        authorId: post.authorId,
        authorUsername: post.authorUsername,        
        title: post.title,
        body: post.body,
        likes: post.likes,
        userIdLikes: post.userIdLikes,
        dislikes: post.dislikes,
        userIdDislikes: post.userIdDislikes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }).then(response => {
        console.log("post post successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}

export const putPost = async(post:Post) => {
    await axios.patch(`${URL}/${post.id}`, {
        id: post.id,
        authorId: post.authorId,
        authorUsername: post.authorUsername,        
        title: post.title,
        body: post.body,
        likes: post.likes,
        userIdLikes: post.userIdLikes,
        dislikes: post.dislikes,
        userIdDislikes: post.userIdDislikes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }).then(response => {
        console.log("patch post successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}

export const deletePost = async(id:string) => {
    await axios.delete(`${URL}/${id}`).then(response => {
        console.log("delete post successfully")
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        return
    })
}