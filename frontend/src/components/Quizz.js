import React, { createContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import { withRouter } from "react-router-dom";

export const QuizzContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "fetchsuccess":
      return {
        ...state,
        questions: action.payload || [],
        status: action.payload && action.payload.length > 0 ? "ready" : "error",
        timer:
          action.payload && action.payload.length > 0
            ? 10 * action.payload.length - 1
            : 0,
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
        status: "ready",
        index: 0,
        score: 0,
        timer: state.questions.length > 0 ? 10 * state.questions.length : 0,
        s1: "",
      };
    case "indexreset":
      return {
        ...state,
        index: 0,
      };
    default:
      return state;
  }
}

function QuizzProvider({ children }) {
  // const { name } = useParams();
  // console.log(name, "params");

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch(`http://localhost:5000/getquestion/${name}`);
  //       const data = await res.json();
  //       dispatch({ type: "fetchsuccess", payload: data.question });
  //       console.log(data);
  //     } catch (e) {
  //       dispatch({ type: "fetchfail" });
  //     }
  //   }
  //   fetchData();
  // }, [name]);

  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    s1: "",
    timer: "",
    score: 0,
    question: "",
  };

  const [{ questions, status, index, s1, timer, score, question }, dispatch] =
    useReducer(reducer, initialState);
  const len =
    questions && questions.length > 0 ? index >= questions.length - 1 : false;
  const length = questions ? questions.length : 0;

  return (
    <div>
      <QuizzContext.Provider
        value={{
          question: questions[index],
          dispatch,
          status,
          s1,
          index,
          len,
          timer,
          length,
          score,
          questions,
        }}
      >
        {children}
      </QuizzContext.Provider>
    </div>
  );
}

export default QuizzProvider;
