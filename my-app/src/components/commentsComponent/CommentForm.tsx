import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { v4 as uuidv4 } from 'uuid';
import { postComment } from "../../api/comments";
import { addComment } from "../../reducers/postsReducer";
import { Comment } from "../../types/comment";
import { Post } from "../../types/post";

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
        <>
            {loggedUser.someoneIsLogged ? (
                <>  
                    <p>Add new comment</p>
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
                        <button type="submit">Add Comment</button>
                    </form>
                </>           
            ):(
                <><p>You must be logged in to comment</p></>           
            )}
        </>

    )
}

export default CommentForm