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