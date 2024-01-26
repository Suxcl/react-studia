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
import { Invite, InviteStatus } from "../types/invite";
import { v4 as uuidv4 } from 'uuid';
import { addInvite } from "../reducers/invitesReducer";
import { postInvite } from "../api/invite";
import PostForm from "../components/postsComponents/PostForm";
import InviteList from "../components/invitesComponents/InviteList";

interface Params {
    id: string;
    [key:string]: string
}

function Profile(){
    let {id} = useParams<Params>()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedUser = useSelector((state: RootState) => state.auth)

    
    // data required for profile
    let userPosts:Post[] = []
    let userPostsCommments:Comment[][] = []
    let userFriends:User[] = []
    let userInvites:Invite[] = []
    // find user Posts
    const postsAll = useSelector((state: RootState) => state.posts).posts
    const postCommentsAll = useSelector((state: RootState) => state.posts).comments
    for(let i = 0; i < postsAll.length; i++){
        if(postsAll[i].authorId === id){
            userPosts.push(postsAll[i])
            userPostsCommments.push(postCommentsAll[i])
        } 
    }
    //find invites to user
    const invitesAll = useSelector((state: RootState) => state.invites).invites
    userInvites = invitesAll.filter(invite => invite.receiverId === id)
    userInvites = userInvites.filter(invite => invite.status === InviteStatus.PENDING)
    // transform friends ids into user list
    const usersAll = useSelector((state: RootState) => state.users).users
    userFriends = usersAll.filter(user => user.friends.includes(id as string))

    const userProfile:User = usersAll.find(user => user.id === id) as User
    
    function EditData(){
        navigate(`/UserEdit`, {state: {user: loggedUser.user}})
    }

    function RemoveAccount(){
        dispatch(removeUser(id))
        deleteUser(id as string)
    }

    const removeFriend = () => {
        
    }
    const sentFriendRequest = () => {
        const logId = loggedUser.user?.id || ''
        const logUserName = loggedUser.user?.username || ''
        console.log(logId, logUserName)
        const invite:Invite = {
            id: uuidv4(),
            senderId: logId,
            senderUsername: logUserName,
            receiverId: userProfile.id,
            receiverUsername: userProfile.username,
            status: InviteStatus.PENDING
        }
        if(invitesAll.find(invite => invite.receiverId === id && invite.senderId === logId)) return
        console.log(invitesAll, invite)
        dispatch(addInvite(invite))
        postInvite(invite)
    }

    return (
        <div>
            <div>
                <h1>Profile - change data or smt</h1>
                {userProfile.username}|{userProfile.name}|{userProfile.surname}
                {loggedUser.user?.id === id ? (
                <> 
                    <button onClick={() =>EditData()}>Edit User Data</button>
                    <button onClick={() =>RemoveAccount()}>Delete Accoutn</button>
                </>
                ):(
                <>
                    {loggedUser.user?.friends.includes(id as string) ? (
                        <>
                            <button onClick={removeFriend}>remove friend</button>
                        </>
                    ):(
                        <>
                            <button onClick={sentFriendRequest}>add friend</button>
                        </>
                    )}
                </>
                )}
   
                {/* else */}
                    {/* dodaj znajomego */}
            </div>
            <div>
                <h1>friends request etc</h1>
                {loggedUser.user?.id === id ? (
                    <>
                        <InviteList invites={userInvites} />
                    </>
                ):(<></>)}
            </div>
            <div>
                <h1>Friends</h1>
                <UsersList usersList={userFriends}/>
            </div>
            <div>
                <h1>Posts</h1>
                {loggedUser.user?.id === id ? (
                    <>
                        <PostForm />
                    </>
                ):(<></>)}
                <PostList postsList={userPosts} postComments={userPostsCommments}/>
            </div>
        </div>
    )
}

export default Profile
