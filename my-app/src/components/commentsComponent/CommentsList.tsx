import { Paper, Typography, List, ListItem, Divider, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import { Comment } from "../../types/comment"
import { Post } from "../../types/post";
import CommentC from "./CommentC"
import CommentForm from "./CommentForm";

 function CommentsList(props: {comments:Comment[], post:Post}) {
    let comments = props.comments
    if(comments === undefined) comments = []
    
    const post = props.post

    const [showAllComments, setShowAllComments] = useState(false);

    const handleShowAllComments = () => {
      setShowAllComments(true);
    };

    return (
        <Paper elevation={3} style={{ padding: '1rem' }}>
          <Typography variant="h6" gutterBottom>Comments</Typography>

          <List>
            {comments.slice(0, showAllComments ? comments.length : 3).map((comment, index) => (
              <React.Fragment key={comment.id}>
                <ListItem>
                  <CommentC comment={comment} postId={post.id} />
                </ListItem>
                {index !== comments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            {!showAllComments && comments.length > 3 && (
            <Button onClick={handleShowAllComments} variant="outlined" color="primary" style={{ marginTop: '1rem' }}>
                Show all comments
            </Button>
      )}
          </List>
          <Grid>
            <CommentForm post={post} />
          </Grid>
        </Paper>
      )
}

export default CommentsList