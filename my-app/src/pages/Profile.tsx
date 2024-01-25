import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "../store";
import { Post } from "../types/post";
import { Comment } from "../types/comment";
import { User } from "../types/user";
import PostList from "../components/postsComponents/PostList";
import { deleteUser } from "../api/user";
import { removeUser } from "../reducers/usersReducer";
import UsersList from "../components/usersComponents/UsersList";

interface Params {
    id: string;
    [key:string]: string
}

function Profile(){
    let {id} = useParams<Params>()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedUser = useSelector((state: RootState) => state.auth)
    const loggedUserProfile:boolean = (id === String(loggedUser.user?.id))
    // data required for profile
    let userPosts:Post[] = []
    let userPostsCommments:Comment[][] = []
    let userFriends:User[] = []
    // find user Posts
    const postsAll = useSelector((state: RootState) => state.posts).posts
    const postCommentsAll = useSelector((state: RootState) => state.posts).comments
    for(let i = 0; i < postsAll.length; i++){
        if(postsAll[i].authorId === id){
            userPosts.push(postsAll[i])
            userPostsCommments.push(postCommentsAll[i])
        } 
    }
    // transform friends ids into user list
    const usersAll = useSelector((state: RootState) => state.users).users
    userFriends = usersAll.filter(user => user.friends.includes(id as string))

    
    function EditData(){
        navigate(`/UserEdit`, {state: {user: loggedUser.user}})
    }

    function RemoveAccount(){
        dispatch(removeUser(id))
        deleteUser(id as string)
    }

    return (
        <div>
            <div>
                <h1>Profile - change data or smt</h1>
                {loggedUserProfile ? (
                <> 
                    <button onClick={() =>EditData()}>Edit User Data</button>
                    <button onClick={() =>RemoveAccount()}>Delete Accoutn</button>
                </>
                ):(
                <>
                    {}
                </>
                )}
   
                {/* else */}
                    {/* dodaj znajomego */}
            </div>
            <div>
                <h1>friends request etc</h1>
            </div>
            <div>
                <h1>Friends</h1>
                <UsersList usersList={userFriends}/>
            </div>
            <div>
                <h1>Posts</h1>
                <PostList postsList={userPosts} postComments={userPostsCommments}/>
            </div>
        </div>
    )
}

export default Profile
