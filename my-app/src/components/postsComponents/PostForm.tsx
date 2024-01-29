import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPost } from "../../api/post";
import { getDate } from "../../functions/dateParser";
import { addPost } from "../../reducers/postsReducer";
import { RootState } from "../../store";
import { Post } from "../../types/post";
import { v4 as uuidv4 } from 'uuid';
import { Paper, Typography, Grid, TextField, Button, InputLabel } from "@mui/material";
import { Label } from "@mui/icons-material";
function PostForm(){

    const loggedUser = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
	const [formData, setFormData] = useState({
        title: "",
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
        const postSend:Post = ({
            id: uuidv4(),
            title: formData.title,
            body: formData.body,
            authorId: authorId,
            authorUsername: authorUsername,
            likes: 0,
            userIdLikes: [],
            dislikes: 0,
            userIdDislikes: [],
            createdAt: getDate(),
            updatedAt: getDate()
        })

        postPost(postSend)
        dispatch(addPost(postSend))
        console.log("Adding new post success", postSend)
        setFormData({
            title: "",
            body: "",
        })
    }

    return (
        <>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>Create new Post</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Title" fullWidth required name="title" value={formData.title} 
                    onChange={handleChange} variant="outlined" margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                
                  <TextField
                    label="Body" fullWidth required name="body" value={formData.body} 
                    onChange={handleChange} variant="outlined" margin="normal"
                  />

                </Grid>
                <Grid item xs={12}>
                  {loggedUser.user !== null ? (
                    <Button type="submit" variant="contained" color="primary" value = "Submit">Submit</Button>
                  ) : (
                    <Typography variant="body1">Log in to add new post</Typography>
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </>
      );
}

export default PostForm