import React from "react";
import QuizzProvider from "./components/QuizzProvider";
import { QuizzContext } from "./components/QuizzProvider";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "./components/Loading";
import Questions from "./components/questions";
import Score from "./components/Score";
export default function Homepage2() {
  const { status, questions, dispatch } = useContext(QuizzContext);
  const { name } = useParams();
  return (
    <div>
      <QuizzProvider>
        {status === "loading" && <Loading></Loading>}
        {status === "error" && <h1>error</h1>}
        {status === "ready" && (
          <>
            {" "}
            <h1>{name} quizz</h1>
            <h1>welcome to the {name}</h1>
            <p>
              {questions?.length} questions to test your {name} knowledge
            </p>
            <button
              type="button"
              onClick={() => {
                console.log("button");
                dispatch({ type: "start" });
              }}
            >
              start
            </button>
          </>
        )}

        {status === "start" && <Questions></Questions>}
        {status === "finish" && <Score></Score>}
      </QuizzProvider>
    </div>
  );
}
