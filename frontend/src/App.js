import logo from "./logo.svg";
import "./App.css";
import Loading from "./components/Loading";
import Questions from "./components/questions";
import Score from "./components/Score";
// import react from "react";
import { useEffect } from "react";
import { useReducer } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "fetchsuccess":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        timer: 5 * state.questions.length - 1,
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
      };
    case "active":
      return {
        ...state,
        s1: "active",
        score:
          action.payload.i === action.payload.correctOPtion
            ? state.score + action.payload.points
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
        timer: 5 * state.questions.length,
        s1: "",
      };

    default:
      return 0;
  }
}

function App() {
  useEffect(function () {
    async function api() {
      try {
        const res = await fetch("http://localhost:5000/getquestion");
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
  };

  const [{ questions, status, index, s1, timer, score }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  const len = index >= questions.length - 1;
  const length = questions.length;
  return (
    <div className="App">
      {status === "loading" && <Loading></Loading>}
      {status === "error" && <h1>error</h1>}
      {status === "ready" && (
        <>
          {" "}
          <h1>react quizz</h1>
          <h1>welcome to the react</h1>
          <p>{questions?.length} questions to test your react knowledge</p>
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

      {status === "start" && (
        <Questions
          question={questions[index]}
          dispatch={dispatch}
          status={status}
          s1={s1}
          index={index}
          len={len}
          timer={timer}
          length={length}
        ></Questions>
      )}
      {status === "finish" && <Score dispatch={dispatch} score={score}></Score>}
    </div>
  );
}

export default App;
