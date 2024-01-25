import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../types/post";
import { useNavigate } from "react-router-dom";
import { addDislike, addLike, removeDislike, removeLike, removePost, updatePost } from "../../reducers/postsReducer";
import { useState } from "react";
import { RootState } from "../../store";
import { deletePost, putPost } from "../../api/post";
import { getDate } from "../../functions/dateParser";
import CommentsList from "../commentsComponent/CommentsList";
import { Comment } from "../../types/comment";


function PostC(props:{post:Post, comments:Comment[]}){
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    console.log(props.post.title)
    console.log(props.post.userIdLikes)
    console.log(props.post.userIdDislikes)
    const post = props.post
    const loggedUser = useSelector((state: RootState) => state.auth)
    const [editPost, setEditPost] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        title: post.title,
        body: post.body
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
        const editedPost:Post = {
            id: post.id,
            title: formData.title,
            body: formData.body,
            authorId: post.authorId,
            authorUsername: post.authorUsername,
            likes: post.likes,
            userIdLikes: post.userIdLikes,
            dislikes: post.dislikes,
            userIdDislikes: post.userIdDislikes,
            createdAt: post.createdAt,
            updatedAt: getDate()
        }
        dispatch(updatePost(editedPost))
        putPost(editedPost)
        EditPost()
    }

    function RemovePost(id: string){
        dispatch(removePost(id))
        deletePost(id)
    }
    function EditPost(){
        setEditPost(!editPost)
    }
    const likeClicked = () => {
        if(!loggedUser.someoneIsLogged) return
        const id = loggedUser.user?.id || 'defaultId'
        
        let likes:number = post.likes
        let likesId:string[] = post.userIdLikes
        // if user likes this post
        if(post.userIdLikes.includes(id)){
            dispatch(removeLike({postId: post.id, userId: id}))
            likes = likes - 1
            likesId = likesId.filter(userId => userId !== id)
        }
        // if he do not like this post and do not dislikes
        else if(!post.userIdDislikes.includes(id)){
            dispatch(addLike({postId: post.id, userId: id}))
            likes = likes + 1
            likesId = [...likesId.map(likeId => likeId), id]
        }
        if(likes === post.likes){
            const editedPost:Post = {
                id: post.id,
                title: post.title,
                body: post.body,
                authorId: post.authorId,
                authorUsername: post.authorUsername,
                likes: likes,
                userIdLikes: likesId,
                dislikes: post.dislikes,
                userIdDislikes: post.userIdDislikes,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
            putPost(editedPost)
        }
        
    }
    const dislikeClicked = () => {
        if(!loggedUser.someoneIsLogged) return
        const id = loggedUser.user?.id || 'defaultId'
        let dislikes:number = post.dislikes
        let dislikesId:string[] = post.userIdDislikes
        if(post.userIdDislikes.includes(id)){
            dispatch(removeDislike({postId: post.id, userId: id}))
            dislikes = dislikes - 1
            dislikesId = dislikesId.filter(userId => userId !== id)
        }
        else if(!post.userIdLikes.includes(id)){
            dispatch(addDislike({postId: post.id, userId: id}))
            dislikes = dislikes + 1
            dislikesId = [...dislikesId.map(dislikeId => dislikeId), id]
            
        }
        if(dislikes === post.dislikes){
            const postToSend:Post = {
                id: post.id,
                title: post.title,
                body: post.body,
                authorId: post.authorId,
                authorUsername: post.authorUsername,
                likes: post.likes,
                userIdLikes: post.userIdLikes,
                dislikes: dislikes,
                userIdDislikes: dislikesId,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
            putPost(postToSend)
        }
    }

    


    return (
        <>  
            <hr></hr>
                {post.id}|{post.title}|{post.body}|{post.authorId}|{post.authorId}|{post.authorUsername}|{post.likes}|{post.userIdLikes}|{post.dislikes}|{post.userIdDislikes}|{post.createdAt}|{post.updatedAt}
            <hr></hr>
                
            {editPost ? 
                (   
                    <>  
                        <form onSubmit={handleSubmit}>
                            <label>Title</label>
                            <input name="title" placeholder="Title" onChange={handleChange} type="text" value={formData.title} /><br></br>
                            <label>Body</label>
                            <input name="body" required placeholder="Body" onChange={handleChange} type="text" value={formData.body}  />
                            <button type="submit">Submit</button>
                            <button onClick={EditPost}>Cancel</button>
                        </form>
                    </>
                ) : (
                    <>
                        <p>Title: {post.title}</p>
                        <p>Content: {post.body}</p>
                    </>
                )}

            {!editPost && loggedUser.user?.id === post.authorId ? (
                <>
                    <p>UserOptions</p>
                    <button onClick={EditPost}>Edit</button>
                    <button onClick={() =>RemovePost(post.id)}>Remove</button>
                </>
            ):(
                <></>
            )}
            <p>Date: {post.createdAt} UpdatedAt: {post.updatedAt}  Author: {post.authorUsername}</p>
            <p>Likes: {post.likes}</p>
            <button onClick={likeClicked}>Like</button>
            <p>Dislikes: {post.dislikes}</p>
            <button onClick={dislikeClicked}>Dislike</button>            
            
            <div>
                <CommentsList comments={props.comments} post={post} />
            </div>

        </>
    )

}


export default PostC