const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("hell0");
});
module.exports = app;
