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
module.exports = { questions };
