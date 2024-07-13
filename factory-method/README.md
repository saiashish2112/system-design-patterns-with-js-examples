# Factory Method Design Pattern -JS

- Creating a `Factory Method design pattern` with Node.js (Express.js) as the backend, React.js as the frontend, and MongoDB as the database involves ***structuring your code in a way that allows for the creation of objects (like database models or service instances)***  through a factory method.
- The Factory Method pattern is ***useful for encapsulating the instantiation logic and making your code more modular and testable.***
- Below is a detailed example of how you can implement the Factory Method design pattern in this ***MERN stack.***

### Backend (Node.js + Express.js)

### 1. Set Up the Project

First, create a new Node.js project and install the necessary dependencies.

```bash
mkdir factory-method-example
cd factory-method-example
npm init -y
npm install express mongoose body-parser
```

### 2. Define the Factory Method

Create a `factory` directory and add a factory method for creating Mongoose models.

`factory/UserFactory.js`**:**

```jsx
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const UserFactory = {
    createUser: function(){
        return mongoose.model('User', userSchema);
    }
}

module.exports = UserFactory
```

### 3. Set Up Express and Routes

Create an Express server and define routes to use the factory to create a User model.

`server.js`**:**

```jsx
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserFactory = require("./factory/UserFactory");
const cors = require("cors");

// Enable CORS for all routes

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/factory-method", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err.message));

const User = UserFactory.createUser();

app.post("/users", async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

### Frontend (React.js)

### 1. Set Up the Project

Create a new React project using Create React App or any other method you prefer.

```bash
npx create-react-app factory-method-client
cd factory-method-client
npm install axios
```

### 2. Create API Service

Create an API service to interact with the backend.

`src/api/userService.js`**:**

```jsx
import axios from "axios";

const API_URL = "http://localhost:3000";

const userService = {
  createUser: (userData) => axios.post(`${API_URL}/users`, userData),
  getUsers: () => axios.get(`${API_URL}/users`),
};

export default userService;
```

### 3. Create React Components

Create components to display and create users.

`src/components/UserList.js`**:**

```jsx
import React, { useEffect, useState } from "react";
import userService from "../api/userService";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService
      .getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UserList;
```

`src/components/UserForm.js`**:**

```jsx
import React, { useState } from "react";
import userService from "../api/userService";

function UserForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    userService
      .createUser({ username, email, password })
      .then((response) => {
        console.log("User created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}

export default UserForm;
```

### 4. Integrate Components in App

Use the created components in your main `App` component.

`src/App.js`**:**

```jsx
import React from "react";
import './styles.css';  // Import the CSS file
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  return (
    <div className="App">
      <div className="container">
      <h1>Factory Method Design Pattern Example</h1>
      <UserForm />
      <UserList />
      </div>
    </div>
  );
}

export default App;
```

### Running the Application

1. **Start the Backend Server**: Ensure MongoDB is running and start the Express server.

```bash
node server.js
```

1. **Start the Frontend Application**: Navigate to the React project directory and start the development server.

```bash
npm start
```

### Summary

This example demonstrates how to implement the Factory Method design pattern with Node.js, Express.js, and React.js. The `UserFactory` creates the `User` model, and the React frontend interacts with the backend through an API service. This pattern encapsulates object creation logic, making the code more modular and easier to maintain.