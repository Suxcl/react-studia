import { useDispatch, useSelector } from "react-redux"
import { Comment } from "../../types/comment"
import { RootState } from "../../store"
import { useState } from "react"
import { updateComment, removeComment } from "../../reducers/postsReducer";
import { putComment } from "../../api/comments";

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
           <>
            <form onSubmit={handleSubmit}>
                <label>
                    Body:
                    <input
                        required
                        type="text"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save</button>
                <button onClick={() => setEditComment(!editComment)}>Cancel</button>
            </form>
           </> 
        ):(
            <>
                <p>Author id:{comment.authorUsername}</p>
                <p>Content: {comment.body}</p>
            </>
        )}
        

        {(comment.authorId === loggedUser.user?.id && editComment === false) ? (
            <>
                <button onClick={() => setEditComment(!editComment)}>Edit</button>
                <button onClick={deleteComment}>Delete</button>
            </>   
        ):(<></>)}
        </>
    )
}

export default CommentC