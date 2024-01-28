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
import { Grid, Typography, Box, Button, Container } from "@mui/material";
import { Margin } from "@mui/icons-material";

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
        <>
            <Grid container style={{marginTop:"80px", padding: "20px"}}>
                <div>
                <Typography variant="h5">Profile - {userProfile.username}</Typography>
                <Typography>{userProfile.name} {userProfile.surname}</Typography>
                <Typography>{userProfile.email}</Typography>
                <br></br>
                <Box>
                    {loggedUser.user?.id === id ? (
                    <> 
                        <Button style={{marginRight: "10px"}} variant="contained" onClick={EditData}>Edit User Data</Button>
                        <Button variant="contained" onClick={RemoveAccount}>Delete Account</Button>
                    </>
                    ) : (
                    <>
                        {loggedUser.user?.friends.includes(id as string) ? (
                        <Button variant="contained" onClick={removeFriend}>Remove Friend</Button>
                        ) : (
                        <Button variant="contained" onClick={sentFriendRequest}>Add Friend</Button>
                        )}
                    </>
                    )}
                </Box>
                </div>
            </Grid>
            <Container maxWidth="xl" style={{ marginTop: "80px"}}>
				<Grid container spacing={2}>
					<Grid item xs={3} style={{minWidth: "200px",padding: "10px",margin: "10px", border: "1px solid black"}}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid xs={6}>
                                <h2 style={{textAlign: "center"}}> FriendsList </h2>
                            </Grid>
                        </Grid>
						{userFriends ? (
                            <>
                                <UsersList usersList={userFriends}/>    
                            </>
						):(
							<><p>There are no users</p></>
						)}

					</Grid>
					<Grid item xs={6} style={{minWidth: "500px",padding: "10px", margin: "10px", border: "1px solid black"}}>
						<h1 style={{textAlign: "center"}}>User Posts</h1>
                        <Grid container alignItems="center" spacing={1}>
                            {loggedUser.user !== null ? (
                                <PostForm/>        
							):(
                                <Typography variant="h6" textAlign="center" color="textSecondary" style={{margin: "auto"}}>
                                Log in to add new post
                                </Typography>
							)}
                        </Grid>
                        <Grid>
						{userPosts ? (
							<PostList postsList={userPosts} postComments={userPostsCommments}/>
						):(<><p>There are no posts</p></>)}
                        </Grid>
					</Grid>
                    
					<Grid item xs={2}  style={{minWidth: "200px",padding: "10px",margin: "10px", border: "1px solid black"}}>
                        <h2 style={{textAlign: "center"}}>Invites</h2>            
                        {loggedUser.user?.id === id ? (
                            <>
                                <InviteList invites={userInvites} />
                            </>
                        ):(<></>)}
					</Grid>
				</Grid>
			</Container>
            
        </>
    )
}

export default Profile
