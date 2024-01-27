import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { v4 as uuidv4 } from 'uuid';
import { postComment } from "../../api/comments";
import { addComment } from "../../reducers/postsReducer";
import { Comment } from "../../types/comment";
import { Post } from "../../types/post";
import { Paper, Typography, TextField, Button } from "@mui/material";

function CommentForm(props: {post:Post}) {
    const post = props.post
    const loggedUser = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        body: "",
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
        const authorId = loggedUser?.user?.id || 'defaultId';
        const authorUsername = loggedUser?.user?.username || 'defaultUsername';
        const newComment:Comment = {
            id: uuidv4(),
            authorId: authorId,
            authorUsername: authorUsername,
            postId: post.id,
            body: formData.body
        }
        dispatch(addComment({postId: post.id, comment: newComment}))
        postComment(newComment)
        setFormData({
            body: "",
        })
    }
    
    return (
        <Paper elevation={3} style={{ padding: '1rem' }}>
          <Typography variant="h6" gutterBottom>Add new comment</Typography>
          {loggedUser.someoneIsLogged ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Body"
                fullWidth
                required
                name="body"
                value={formData.body}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">Add Comment</Button>
            </form>
          ) : (
            <Typography variant="body1">You must be logged in to comment</Typography>
          )}
        </Paper>
      )
}

export default CommentForm