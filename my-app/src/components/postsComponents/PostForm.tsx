import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPost } from "../../api/post";
import { getDate } from "../../functions/dateParser";
import { addPost } from "../../reducers/postsReducer";
import { RootState } from "../../store";
import { Post } from "../../types/post";
import { v4 as uuidv4 } from 'uuid';
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
            <p>Create new Post</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input required placeholder="title" name="title" value={formData.title} onChange={handleChange} type="text" />
                <label htmlFor="body">Body</label>
                <input required placeholder="body" name="body" value={formData.body} onChange={handleChange} type="text" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default PostForm