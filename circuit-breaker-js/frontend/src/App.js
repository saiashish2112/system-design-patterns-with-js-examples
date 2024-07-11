import React from "react";
import Posts from "./components/posts/Posts";
import { CssBaseline, Container } from "@mui/material";

const App = () => {
  return (
    <Container>
      <CssBaseline />
      <Posts />
    </Container>
  );
};

export default App;
