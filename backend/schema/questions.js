const mongoose = require("mongoose");
const questionschema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "please enter question"],
  },
  options: {
    type: [{ type: String, required: [true, "please give option"] }],
  },
  correctOption: {
    type: Number,
    required: [true, "pllese enter coorrecr option"],
  },
  points: {
    type: Number,
    required: [true, "enter marks"],
  },
});
const questions = mongoose.model("question", questionschema);
const HtmlQuestions = mongoose.model("HtmlQuestion", questionschema);
const ReactQuestions = mongoose.model("ReactQuestion", questionschema);
const CssQuestions = mongoose.model("CssQuestion", questionschema);
const JsQuestions = mongoose.model("JsQuestion", questionschema);
const NodeQuestions = mongoose.model("NodeQuestion", questionschema);
const ExpressQuestions = mongoose.model("ExpressQuestion", questionschema);
const MongoDBQuestions = mongoose.model("MongoDBQuestion", questionschema);
module.exports = {
  questions,
  HtmlQuestions,
  ReactQuestions,
  CssQuestions,
  JsQuestions,
  NodeQuestions,
  ExpressQuestions,
  MongoDBQuestions,
};
