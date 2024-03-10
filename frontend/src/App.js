import logo from "./logo.svg";
import "./App.css";
import Loading from "./components/Loading";
import Questions from "./components/questions";
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
      };
    case "fetchfail":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "start",
      };
    case "active":
      return {
        ...state,
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
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
  };
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialstate
  );

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
        ></Questions>
      )}
    </div>
  );
}

export default App;
