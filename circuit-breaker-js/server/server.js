const express = require("express");
const axios = require("axios");
const CircuitBreaker = require("opossum");
const cors = require("cors");

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Example external service endpoint
const externalServiceUrl = "https://jsonplaceholder.typicode.com/";

// Function to call the external service
const fetchData = () => axios.get(externalServiceUrl);

// Setting up the circuit breaker with options
const options = {
  timeout: 5000, // If the request takes longer than 5 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000, // After 30 seconds, try again
};

// Circuit breaker for getPosts
const circuitBreakerGetPosts = new CircuitBreaker(fetchData, options);
// Circuit breaker for getComments
const circuitBreakerGetComments = new CircuitBreaker(fetchData, options);

// test endpoint
app.get("/test", async (req, res) => {
  try {
    res.json("Hello Sai, Testing is successful!!!");
  } catch (error) {
    res.status(500).send("Service temporarily unavailable");
  }
});

// Endpoint to get data for Posts
app.get("/api/getPosts", async (req, res) => {
  try {
    const response = await circuitBreakerGetPosts.fire();
    // console.log(`response1`, response);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Service temporarily unavailable");
  }
});

// Endpoint to get data for Comments
app.get("/api/getComments", async (req, res) => {
  try {
    const response = await circuitBreakerGetComments.fire();
    console.log(`response2`, response);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Service temporarily unavailable");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
