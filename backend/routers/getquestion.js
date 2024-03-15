const { default: mongoose } = require("mongoose");
const {
  questions,
  ReactQuestions,
  HtmlQuestions,
  CssQuestions,
  JsQuestions,
  NodeQuestions,
  ExpressQuestions,
  MongoDBQuestions,
} = require("../schema/questions");
const React = "React";
const models = {
  react: ReactQuestions,
  html: HtmlQuestions,
  css: CssQuestions,
  js: JsQuestions,
  node: NodeQuestions,
  express: ExpressQuestions,
  mongo: MongoDBQuestions,
};
async function getquestion(req, res) {
  try {
    const params = req.params.name;
    const collection = models[`${params}`];
    const question = await collection.find();

    console.log(req.params.name);
    // const r = await result.json();
    res.json({
      message: "suceess",

      question,
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "error",
    });
  }
}
module.exports = { getquestion };
