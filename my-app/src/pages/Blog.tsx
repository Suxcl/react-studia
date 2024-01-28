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
import PostForm from "../components/postsComponents/PostForm";
import { Container, Grid, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';

function Blog(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useSelector((state: RootState) => state.auth)

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
    let posts = useSelector((state: RootState) => state.posts).reversePosts
    let postComments = useSelector((state: RootState) => state.posts).reverseComments
    


    return (
        <>	

			<Container maxWidth="xl" style={{ marginTop: "80px"}}>
				
				<Grid container spacing={2}>
					<Grid item xs={3} style={{minWidth: "200px",padding: "10px",margin: "10px", border: "1px solid black"}}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid xs={6}>
                            
                                <h2 style={{textAlign: "center"}}> UsersList </h2>
                            </Grid>
                        </Grid>
						
						
						{users ? (
                            <>
							
                            <UsersList usersList={users}/>    
                            </>
						):(
							<><p>There are no users</p></>
						)}

					</Grid>
					<Grid item xs={6} style={{minWidth: "500px",padding: "10px", margin: "10px", border: "1px solid black"}}>
						<h1 style={{textAlign: "center"}}>Posts</h1>
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
						{posts ? (
							<PostList postsList={posts} postComments={postComments}/>
						):(<><p>There are no posts</p></>)}
                        </Grid>
					</Grid>
                    
					<Grid item xs={2}  style={{minWidth: "200px",padding: "10px",margin: "10px", border: "1px solid black"}}>
                        <h2 style={{textAlign: "center"}}>Info of the day</h2>
						<p>यह एक लंबा स्थापित तथ्य है कि जब एक पाठक एक पृष्ठ के खाखे को देखेगा तो पठनीय सामग्री से विचलित हो जाएगा. Lorem Ipsum का उपयोग करने का मुद्दा यह है कि इसमें एक और अधिक या कम अक्षरों का सामान्य वितरण किया गया है, 'Content here, content here' प्रयोग करने की जगह इसे पठनीय English के रूप में प्रयोग किया जाये. अब कई डेस्कटॉप प्रकाशन संकुल और वेब पेज संपादक उनके डिफ़ॉल्ट मॉडल पाठ के रूप में Lorem Ipsum उपयोग करते हैं, और अब "Lorem Ipsum" के लिए खोज अपने शैशव में कई वेब साइटों को उजागर करती है. इसके विभिन्न संस्करणों का वर्षों में विकास हुआ है, कभी दुर्घटना से, तो कभी प्रयोजन पर (हास्य और लगाव डालने के लिए).</p>
					</Grid>
				</Grid>
			</Container>
            
            

        </>
    )
}

export default Blog