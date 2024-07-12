const express = require("express");
const app = express();
const instance = require("./database");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");


const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

app.get('/db-status', (req, res)=>{
    const dbConnection = instance.getConnection();
    res.send(dbConnection).status(200);
    res.json("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});