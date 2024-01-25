import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { Post } from "../../types/post"
import PostC from "./PostC"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { postPost } from "../../api/post"
import { addPost } from "../../reducers/postsReducer"
import { getDate } from "../../functions/dateParser"
import { Comment } from "../../types/comment"

function PostsList(props: {postsList: Post[], postComments: Comment[][]}) {
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
        {loggedUser.someoneIsLogged ? (
            <>
            <hr></hr>
            <p>Create new Post</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input required placeholder="title" name="title" value={formData.title} onChange={handleChange} type="text" />
                <label htmlFor="body">Body</label>
                <input required placeholder="body" name="body" value={formData.body} onChange={handleChange} type="text" />
                <button type="submit">Submit</button>
            </form>
            <hr></hr>
            </>
        ):(<></>)}
        <ul>
            {   

                props.postsList.map((post: Post, index: number) => (
                    <li key={post.id}>
                        <PostC post={post} comments={props.postComments[index]}/>
                    </li>
                ))
            }
        </ul>
            
        </>
    )
}


export default PostsList