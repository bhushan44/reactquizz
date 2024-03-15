const express = require("express");
const { postquestion } = require("./routers/question");
const { getquestion } = require("./routers/getquestion");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.post("/", postquestion);
app.get("/getquestion/:name", getquestion);

// app.get("/")
module.exports = app;
