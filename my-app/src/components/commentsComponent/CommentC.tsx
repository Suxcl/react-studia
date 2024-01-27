import { useDispatch, useSelector } from "react-redux"
import { Comment } from "../../types/comment"
import { RootState } from "../../store"
import { useState } from "react"
import { updateComment, removeComment } from "../../reducers/postsReducer";
import { putComment } from "../../api/comments";
import { TextField, Button, Typography } from "@mui/material";

function CommentC(props: {comment:Comment, postId: string}){

    const comment = props.comment
    const loggedUser = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    
    const [editComment, setEditComment] = useState<boolean>(false)
    const [formData, setFormData] = useState({        
        body: comment.body
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
        const editedComment:Comment = {
            id: comment.id,
            authorId: comment.authorId,
            authorUsername: comment.authorUsername,
            postId: comment.postId,
            body: formData.body
        }
        dispatch(updateComment({comment:editedComment, postId:props.postId}))
        putComment(editedComment)
        setEditComment(!editComment)
        setFormData({
            body: "",
        })
        
    }
    const deleteComment = () => {
        dispatch(removeComment({comment:comment, postId:props.postId}))
        removeComment(comment)
    }
    return (
        <>
          {editComment ? (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                label="Body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">Save</Button>
              <Button onClick={() => setEditComment(!editComment)}>Cancel</Button>
            </form>
          ) : (
            <>
              <Typography variant="body1">Author: {comment.authorUsername}</Typography>
              <Typography variant="body1">Content: {comment.body}</Typography>
            </>
          )}
    
          {comment.authorId === loggedUser.user?.id && !editComment && (
            <>
              <Button onClick={() => setEditComment(!editComment)}>Edit</Button>
              <Button onClick={deleteComment}>Delete</Button>
            </>
          )}
        </>
      );
}

export default CommentC