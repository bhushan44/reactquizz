const mongoose = require("mongoose");
const { questions } = require("../schema/questions");
function postquestion(req, res) {
  const question = new questions({
    question: req.body.question,
    options: req.body.options,
    correctOption: req.body.correctOption,
    points: req.body.points,
  });
  question
    .save()
    .then((data) => {
      res.json({
        message: "success",
        data: data,
      });
    })
    .catch((e) => {
      res.json({
        message: e,
      });
    });
}
module.exports = { postquestion };
