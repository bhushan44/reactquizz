import React from "react";

export default function Questions({ question, dispatch, status }) {
  return (
    <div>
      <h1>{question.question}</h1>
      {question.options.map((o) => {
        return (
          <>
            <p
              onClick={() => {
                dispatch({ type: "active" });
              }}
            >
              {o}
            </p>
          </>
        );
      })}
      <button
        onClick={() => {
          dispatch({ type: "next" });
        }}
      >
        next
      </button>
    </div>
  );
}
