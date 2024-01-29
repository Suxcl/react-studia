import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../types/post";
import { useNavigate } from "react-router-dom";
import { addDislike, addLike, removeDislike, removeLike, removePost, updatePost } from "../../reducers/postsReducer";
import { useState } from "react";
import { RootState } from "../../store";
import { deletePost, putPost } from "../../api/post";
import { getDate } from "../../functions/dateParser";
import CommentsList from "../commentsComponent/CommentsList";
import { Comment } from "../../types/comment";
import { Typography, TextField, Button, IconButton, Grid, Paper, Divider } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function PostC(props:{post:Post, comments:Comment[]}){
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    console.log(props.post.title)
    console.log(props.post.userIdLikes)
    console.log(props.post.userIdDislikes)
    const post = props.post
    const loggedUser = useSelector((state: RootState) => state.auth)
    const [editPost, setEditPost] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        title: post.title,
        body: post.body
    })
    const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const editedPost:Post = {
            id: post.id,
            title: formData.title,
            body: formData.body,
            authorId: post.authorId,
            authorUsername: post.authorUsername,
            likes: post.likes,
            userIdLikes: post.userIdLikes,
            dislikes: post.dislikes,
            userIdDislikes: post.userIdDislikes,
            createdAt: post.createdAt,
            updatedAt: getDate()
        }
        dispatch(updatePost(editedPost))
        putPost(editedPost)
        EditPost()
    }

    function RemovePost(id: string){
        dispatch(removePost(id))
        deletePost(id)
    }
    function EditPost(){
        setEditPost(!editPost)
    }
    const likeClicked = () => {
        if(!loggedUser.someoneIsLogged) return
        const id = loggedUser.user?.id || 'defaultId'
        
        let likes:number = post.likes
        let likesId:string[] = post.userIdLikes
        // if user likes this post
        if(post.userIdLikes.includes(id)){
            dispatch(removeLike({postId: post.id, userId: id}))
            likes = likes - 1
            likesId = likesId.filter(userId => userId !== id)
        }
        // if he do not like this post and do not dislikes
        else if(!post.userIdDislikes.includes(id)){
            dispatch(addLike({postId: post.id, userId: id}))
            likes = likes + 1
            likesId = [...likesId.map(likeId => likeId), id]
        }
        if(likes === post.likes){
            const editedPost:Post = {
                id: post.id,
                title: post.title,
                body: post.body,
                authorId: post.authorId,
                authorUsername: post.authorUsername,
                likes: likes,
                userIdLikes: likesId,
                dislikes: post.dislikes,
                userIdDislikes: post.userIdDislikes,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
            putPost(editedPost)
        }
        
    }
    const dislikeClicked = () => {
        if(!loggedUser.someoneIsLogged) return
        const id = loggedUser.user?.id || 'defaultId'
        let dislikes:number = post.dislikes
        let dislikesId:string[] = post.userIdDislikes
        if(post.userIdDislikes.includes(id)){
            dispatch(removeDislike({postId: post.id, userId: id}))
            dislikes = dislikes - 1
            dislikesId = dislikesId.filter(userId => userId !== id)
        }
        else if(!post.userIdLikes.includes(id)){
            dispatch(addDislike({postId: post.id, userId: id}))
            dislikes = dislikes + 1
            dislikesId = [...dislikesId.map(dislikeId => dislikeId), id]
            
        }
        if(dislikes === post.dislikes){
            const postToSend:Post = {
                id: post.id,
                title: post.title,
                body: post.body,
                authorId: post.authorId,
                authorUsername: post.authorUsername,
                likes: post.likes,
                userIdLikes: post.userIdLikes,
                dislikes: dislikes,
                userIdDislikes: dislikesId,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
            putPost(postToSend)
        }
    }

    


    return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {editPost ? (
              <Paper elevation={3} style={{ padding: '1rem' }}>
                <Typography variant="h6" gutterBottom>Edit Post</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField name="title" label="Title" fullWidth margin="normal" 
                  value={formData.title} onChange={handleChange} />
                    <TextField
                    label="Body" fullWidth required name="body" value={formData.body} 
                    onChange={handleChange} variant="outlined" margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary" value="submit">Submit</Button>
                  <Button onClick={EditPost} value="cancel">Cancel</Button>
                </form>
              </Paper>
            ) : (
              <Paper elevation={3} style={{ padding: '1rem' }}>
                <Typography variant="h5" gutterBottom>{post.title}</Typography>
                <Typography variant="body1" gutterBottom>{post.body}</Typography>
                {!editPost && loggedUser.user?.id === post.authorId && (
                  <div>
                    <IconButton value="Edit" onClick={EditPost}><EditIcon />Edit</IconButton>
                    <IconButton value="Delete" onClick={() => RemovePost(post.id)}><DeleteIcon />Remove</IconButton>
                  </div>
                )}
                <Typography variant="body2" gutterBottom>Date: {post.createdAt} 
                | Updated At: {post.updatedAt} | Author: {post.authorUsername}</Typography>
                <Typography variant="body2">Likes: {post.likes} | Dislikes: {post.dislikes}</Typography>
                <Button onClick={likeClicked} value="Like">Like</Button>
                <Button onClick={dislikeClicked} value="Dislike">Dislike</Button>
              </Paper>
            )}
          </Grid>
          <Grid item xs={12}>
            <CommentsList comments={props.comments} post={post}/>
          </Grid>
          
          
        </Grid>
        
      )
}


export default PostC