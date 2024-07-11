# Circuit Breaker Design Pattern - JS

> The Circuit Breaker design pattern is a crucial design pattern used in software development, especially in `microservices and distributed systems`, to improve the system's fault tolerance and resilience. It is used to detect failures and encapsulate the logic of preventing a failure from constantly recurring, which would allow the system to handle faults gracefully.

## Concept of Circuit Breaker Pattern

The Circuit Breaker pattern works like an electrical circuit breaker:

1. **`Closed State`**: Initially, the circuit is in a closed state, where requests flow normally.
2. **`Open State`**: If the requests fail beyond a threshold, the circuit trips to an open state, where requests are blocked for a certain period.
3. **`Half-Open State**:` After the timeout period, the circuit goes to a half-open state to test if the underlying problem has been resolved. If the next request succeeds, the circuit returns to the closed state. If it fails, the circuit goes back to the open state.

## Implementing Circuit Breaker in a MERN Stack Application with AWS

### 1. Node.js Backend (Express.js)

We'll use a library like `opossum` for implementing the circuit breaker in the Node.js backend.

### Installation

```bash
npm install express opossum axios
```

### Server Setup (server.js)

```jsx
const express = require("express");
const axios = require("axios");
const CircuitBreaker = require("opossum");
const cors = require("cors");

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Example external service endpoint
const externalServiceUrl = "https://jsonplaceholder.typicode.com/posts";

// Function to call the external service
const fetchData = () => axios.get(externalServiceUrl);

// Setting up the circuit breaker with options
const options = {
  timeout: 5000, // If the request takes longer than 5 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000, // After 30 seconds, try again
};

const circuitBreaker = new CircuitBreaker(fetchData, options);

// test endpoint
app.get("/test", async (req, res) => {
  try {
    res.json("Hello Sai, Testing is successfull!!!");
  } catch (error) {
    res.status(500).send("Service temporarily unavailable");
  }
});

// Endpoint to get data
app.get("/api/getPosts", async (req, res) => {
  try {
    const response = await circuitBreaker.fire();
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Service temporarily unavailable");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

### 2. React Frontend

We'll create a simple `React frontend` that calls the Node.js backend.

### Installation

```bash
npx create-react-app frontend
cd frontend
npm install axios
```

### App Component (App.js)

```jsx
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
```

### Posts Component (Post.js)

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
```

### 3. AWS Deployment

Deploying this `MERN stack` application on AWS involves several steps:

### `a. **AWS EC2 Instance for Node.js Backend**`

1. Launch an EC2 instance.
2. SSH into the instance and set up Node.js and your application.
3. Install necessary dependencies and run the server.

### `b. **AWS S3 and CloudFront for React Frontend**`

1. Build the React application.

   ```bash
   npm run build
   ```

2. Upload the build folder to an S3 bucket.
3. Configure the S3 bucket for static website hosting.
4. Use CloudFront to distribute the React app globally.

### `c. **API Gateway and Lambda (Optional)**`

You could use API Gateway to manage the API endpoints and AWS Lambda functions for the backend, adding more scalability and resilience.

## Summary

> The `Circuit Breaker pattern` helps to avoid cascading failures and gives time for the system to recover. It is particularly useful in microservices architectures where several services depend on each other. In the MERN stack example, the Node.js backend implements the circuit breaker to manage calls to an external service, while the React frontend handles the responses gracefully. Deploying this setup on AWS involves leveraging various AWS services like EC2, S3, and CloudFront to ensure scalability and reliability.
