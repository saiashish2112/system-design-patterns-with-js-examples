import React from "react";
import Posts from "./components/posts/Posts";
import Comments from "./components/comments/Comments";
import { CssBaseline, Container } from "@mui/material";

const App = () => {
  return (
    <Container>
      <CssBaseline />
      <Posts />
      <Comments />
    </Container>
  );
};

export default App;
