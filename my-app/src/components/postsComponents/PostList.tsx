import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { Post } from "../../types/post"
import PostC from "./PostC"
import PostForm from "./PostForm"
import { Comment } from "../../types/comment"

function PostsList(props: {postsList: Post[], postComments: Comment[][]}) {
    const loggedUser = useSelector((state: RootState) => state.auth)
    return (
        <>
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