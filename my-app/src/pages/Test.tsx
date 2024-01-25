import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import { setUsers } from "../reducers/usersReducer";
import { setPosts } from "../reducers/postsReducer";
import { setInvites } from "../reducers/invitesReducer";

import { getUsers } from "../api/user"
import { getPosts } from "../api/post"
import { getInvites } from "../api/invite"

import UsersList from "../components/usersComponents/UsersList";
import PostList from "../components/postsComponents/PostList";

import type { User } from "../types/user";
import type { Post } from "../types/post";
import type { Invite } from "../types/invite";
import { Comment } from "../types/comment";
import { getComments } from "../api/comments";

function Test(){
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUsersAsync = async () => {
            try{
                const result = await getUsers()
                dispatch(setUsers(result as User[]))
                console.log(result)
            }catch(error){
                console.log(error)
            }      
        }
        const fetchPostsAsync = async () => {
            try{
                const postsFetch = (await getPosts())
                const comments = await getComments()
                let postComments:Comment[][] = []
                for(let i = 0; i < postsFetch.length; i++){
                    postComments[i] = []
                }
                //console.log('before', postComments)
                for(let i = 0; i < postsFetch.length; i++){
                    for(let j = 0; j < comments.length; j++){
                        if(String(postsFetch[i].id) === String(comments[j].postId)){
                            postComments[i].push(comments[j])
                        }
                    }
                 
                }
                dispatch(setPosts({posts: postsFetch, comments: postComments}))
            }catch(error){
                console.log(error)
            }
        }
        const fetchInvitesAsync = async () => {
            try{
                const result = await getInvites()
                dispatch(setInvites(result as Invite[]))
                console.log(result)
            }catch(error){
                console.log(error)
            }
        }



        fetchUsersAsync()
        fetchPostsAsync()
        fetchInvitesAsync()
    },[dispatch])

    let users = useSelector((state: RootState) => state.users).users
    let posts = useSelector((state: RootState) => state.posts).posts
    let postComments = useSelector((state: RootState) => state.posts).comments
    let invites = useSelector((state: RootState) => state.invites).invites


    return (
        <>
            <h1>Testing Grounds</h1>
            <hr></hr>

            <h1>Users</h1>
            <hr></hr>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
            <hr></hr>
            {users ? (
                <UsersList usersList={users}/>    
            ):(
                <><p>There are no users</p></>
            )}
            
            <hr></hr>

            <h1>Posts</h1>
            {posts ? (
                <PostList postsList={posts} postComments={postComments}/>
            ):(<><p>There are no posts</p></>)}
            
            
            <hr></hr>

            <h1>Invites</h1>
        </>
    )
}

export default Test