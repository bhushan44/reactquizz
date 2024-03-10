const mongoose = require("mongoose");
const express = require("express");

const app = require("./app");
app.listen("5000", () => {
  console.log("server listening");
});

mongoose
  .connect("mongodb+srv://bhushan:bhushan@quizz.qnygxxb.mongodb.net/")
  .then(() => {
    console.log("connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });
