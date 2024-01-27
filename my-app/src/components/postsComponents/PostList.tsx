import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { Post } from "../../types/post"
import PostC from "./PostC"
import PostForm from "./PostForm"
import { Comment } from "../../types/comment"
import { List, ListItem } from "@mui/material"

function PostsList(props: {postsList: Post[], postComments: Comment[][]}) {
    const loggedUser = useSelector((state: RootState) => state.auth)
    return (
        <>
        <List>
            {   

                props.postsList.map((post: Post, index: number) => (
                    <ListItem key={post.id} >
                        <PostC post={post} comments={props.postComments[index]}/>
                    </ListItem>
                ))
            }
        </List>
            
        </>
    )
}


export default PostsList