import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/comments"
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>
      <Grid container spacing={3}>
        {comments.map((comment) => (
          <Grid item xs={12} sm={6} md={4} key={comment.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {comment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.body}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Comments;
