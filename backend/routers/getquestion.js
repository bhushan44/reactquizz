const { questions } = require("../schema/questions");
async function getquestion(req, res) {
  try {
    const question = await questions.find();
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
