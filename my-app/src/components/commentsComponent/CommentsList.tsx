import { Comment } from "../../types/comment"
import { Post } from "../../types/post";
import CommentC from "./CommentC"
import CommentForm from "./CommentForm";

 function CommentsList(props: {comments:Comment[], post:Post}) {
    let comments = props.comments
    if(comments === undefined) comments = []
    
    const post = props.post

    return (
        <>
            <div>
                <CommentForm post={post} />
            </div>
            <div>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>                            
                        <CommentC comment={comment} postId={post.id} />
                    </li>    
                ))}
            </ul>
            </div>
        </>
     )
}

export default CommentsList