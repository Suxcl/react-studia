import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../types/post";
import { Comment } from "../types/comment";


interface PostsState {
    posts: Post[]
    reversePosts: Post[] 
    comments: Comment[][]
    reverseComments: Comment[][]
    init_status: true|false,
  }


const initialState: PostsState = {
    init_status: true,
    posts: [], 
    reversePosts: [],
    comments: [],
    reverseComments: []
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            if(state.init_status) {
                console.log("set posts")
                console.log(action.payload)
                console.log(action.payload.comments)
                state.posts = action.payload.posts
                state.reversePosts = action.payload.posts.reverse()
                state.comments = action.payload.comments
                state.reverseComments = action.payload.comments.reverse()
                state.init_status = false
            }
        },
        addPost(state, action) {
            console.log("adding new post to redux")     
            console.log(action.payload)
            if(state.posts === undefined) {
                state.posts = [action.payload]
                state.reversePosts = [action.payload]
            }else{
                state.posts.push(action.payload)
                state.reversePosts = state.posts.reverse()
            }
            
        },
        removePost(state, action) {
            state.posts = state.posts.filter(post => post.id !== action.payload)
            state.reversePosts = state.reversePosts.filter(post => post.id !== action.payload)
        },
        updatePost(state, action) {
            let Post:Post = action.payload
            let index = state.posts.findIndex(post => post.id === action.payload.id)
            let indexReverse = state.reversePosts.findIndex(post => post.id === action.payload.id)
            state.posts[index] = Post
            state.reversePosts[indexReverse] = Post
        },
        // {}
        // {postId:string, comment:Comment}
        addComment(state, action) {
            let index = state.posts.findIndex(post => String(post.id) === String(action.payload.postId))
            let index2 = state.reversePosts.findIndex(post => String(post.id) === String(action.payload.postId))
            if(state.comments[index] === undefined) {
                state.comments[index] = [action.payload.comment]
                state.reverseComments[index2] = [action.payload.comment]
            }else{
                state.comments[index].push(action.payload.comment)
                state.reverseComments[index2].push(action.payload.comment)
            }
        },
        updateComment(state, action) {
            let index = state.posts.findIndex(post => String(post.id) === String(action.payload.postId))
            let index2 = state.comments[index].findIndex(comment => String(comment.id) === String(action.payload.comment.id))
            let indexReverse = state.reversePosts.findIndex(post => String(post.id) === String(action.payload.postId))
            let index2Reverse = state.reverseComments[indexReverse].findIndex(comment => String(comment.id) === String(action.payload.comment.id))
            state.comments[index][index2] = (action.payload.comment)
            state.reverseComments[indexReverse][index2Reverse] = (action.payload.comment)
        },
        removeComment(state, action) {
            let index = state.posts.findIndex(post => String(post.id) === String(action.payload.postId))
            let index2 = state.comments[index].findIndex(comment => String(comment.id) === String(action.payload.comment.id))
            state.comments[index] = state.comments[index].filter(comment => String(comment.id) !== String(action.payload.comment.id))
            state.reverseComments[index2] = state.reverseComments[index].filter(comment => String(comment.id) !== String(action.payload.comment.id))
        },
        // {postId:string, userId:string}
        addLike(state, action) {
            let index = state.posts.findIndex(post => String(post.id) === String(action.payload.postId))
            let index2 = state.reversePosts.findIndex(post => String(post.id) === String(action.payload.postId))
            state.posts[index].userIdLikes.push(action.payload.userId)
            state.posts[index].likes = state.posts[index].likes + 1
            state.reversePosts[index2].userIdLikes.push(action.payload.userId)
            state.reversePosts[index2].likes = state.reversePosts[index2].likes + 1
        },
        removeLike(state, action) {
            let index = state.posts.findIndex(post => String(post.id) === String(action.payload.postId))
            let index2 = state.reversePosts.findIndex(post => String(post.id) === String(action.payload.postId))
            state.posts[index].userIdLikes = state.posts[index].userIdLikes.filter(userId => userId !== action.payload.userId)
            state.posts[index].likes = state.posts[index].likes - 1
            state.reversePosts[index2].userIdLikes = state.reversePosts[index2].userIdLikes.filter(userId => userId !== action.payload.userId)
            state.reversePosts[index2].likes = state.reversePosts[index2].likes - 1
        },
        addDislike(state, action) {
            let index = state.posts.findIndex(post => String(post.id) === String(action.payload.postId))
            let index2 = state.reversePosts.findIndex(post => String(post.id) === String(action.payload.postId))
            state.posts[index].userIdDislikes.push(action.payload.userId)
            state.posts[index].dislikes = state.posts[index].dislikes + 1
            state.reversePosts[index2].userIdDislikes.push(action.payload.userId)
            state.reversePosts[index2].dislikes = state.reversePosts[index2].dislikes + 1
        },
        removeDislike(state, action) {
            let index = state.posts.findIndex(post => String(post.id) === String(action.payload.postId))
            let index2 = state.reversePosts.findIndex(post => String(post.id) === String(action.payload.postId))
            state.posts[index].userIdDislikes = state.posts[index].userIdDislikes.filter(userId => userId !== action.payload.userId)
            state.posts[index].dislikes = state.posts[index].dislikes - 1
            state.reversePosts[index2].userIdDislikes = state.reversePosts[index2].userIdDislikes.filter(userId => userId !== action.payload.userId)
            state.reversePosts[index2].dislikes = state.reversePosts[index2].dislikes - 1
        },

    }
})

export const { addPost, removePost, updatePost, setPosts, addComment, updateComment, removeComment, addLike, removeLike, addDislike, removeDislike } = postSlice.actions
export default postSlice.reducer