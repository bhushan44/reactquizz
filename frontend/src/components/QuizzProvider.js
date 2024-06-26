import React from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
export const QuizzContext = createContext();
function reducer(state, action) {
  const object = action.payload;
  console.log(object);
  switch (action.type) {
    case "fetchsuccess":
      return {
        ...state,
        questions:
          action.payload && action.payload.length > 0 ? action.payload : null,
        status: "ready",
        timer:
          action.payload && action.payload.length > 0
            ? 10 * state.questions.length - 1
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
export default function QuizzProvider({ children, name }) {
  // const { name } = useParams();

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
  const len =
    questions && questions.length > 0 ? index >= questions?.length - 1 : false;
  const length = questions ? questions.length : 0;
  return (
    <div>
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
        {children}
      </QuizzContext.Provider>
    </div>
  );
}
// export { QuizzContext };
