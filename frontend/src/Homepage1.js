import logo from "./logo.svg";
import "./App.css";
import Loading from "./components/Loading";
import Questions from "./components/questions";
import Score from "./components/Score";
import { useParams } from "react-router-dom";
// import react from "react";
import { createContext, useEffect } from "react";
import { useReducer } from "react";
function reducer(state, action) {
  const object = action.payload;
  console.log(object);
  switch (action.type) {
    case "fetchsuccess":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        timer: 10 * state.questions.length - 1,
      };
    case "fetchfail":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: state.timer <= 0 ? "finish" : "start",
        timer: state.timer - 1,
        question: state.questions[state.index],
      };
    case "active":
      return {
        ...state,
        s1: "active",
        question: state.questions[state.index],

        score:
          action.payload === state.question.correctOption
            ? state.score + state.question.points
            : state.score,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        s1: "",
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        timer: "",
      };
    case "restart":
      return {
        ...state,
        // questions: [],
        status: "ready",
        index: 0,
        score: 0,
        timer: 10 * state.questions.length,
        s1: "",
      };

    default:
      return 0;
  }
}
const QuizzContext = createContext();
function Homepage1() {
  const { name } = useParams();
  useEffect(function () {
    async function api() {
      try {
        const res = await fetch(`http://localhost:5000/getquestion/${name}`);
        const data = await res.json();
        dispatch({ type: "fetchsuccess", payload: data.question });
        console.log(data);
      } catch (e) {
        dispatch({ type: "fetchfail" });
      }
    }
    api();
  }, []);

  const initialstate = {
    questions: [],
    status: "loading",
    index: 0,
    s1: "",
    timer: "",
    score: 0,
    question: "",
  };

  const [{ questions, status, index, s1, timer, score, question }, dispatch] =
    useReducer(reducer, initialstate);
  const len = index >= questions.length - 1;
  const length = questions.length;
  return (
    <div className="App">
      <QuizzContext.Provider
        value={{
          question: questions[index],
          dispatch: dispatch,
          status: status,
          s1: s1,
          index,
          len,
          timer,
          length,
          score,
        }}
      >
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
      </QuizzContext.Provider>
    </div>
  );
}

export { Homepage1, QuizzContext };
