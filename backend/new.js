const mongoose = require("mongoose");
const fs = require("fs");
const { questions } = require("./schema/questions");
// const express = require("express");

// const app = require("./app");
// app.listen("5000", () => {
//   console.log("server listening");
// });

mongoose
  .connect("mongodb+srv://bhushan:bhushan@quizz.qnygxxb.mongodb.net/")
  .then(() => {
    console.log("connected successfully");
    // insert();
  })
  .catch((e) => {
    console.log(e);
  });
const question = JSON.parse(fs.readFileSync("./data/questions.json", "utf-8"));
console.log(question);
async function insert() {
  try {
    await questions.create(question.questions);
    console.log("success");
  } catch (e) {
    console.log(e);
  }
}
async function deletequestion() {
  try {
    await questions.deleteMany();
    console.log("dele");
  } catch (e) {
    console.log(e);
  }
}

// insert();
console.log(process.argv);

if (process.argv[2] === "--delete") {
  deletequestion();
} else if (process.argv[2] === "--insert") {
  insert();
}
