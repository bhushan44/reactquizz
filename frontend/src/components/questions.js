import React from "react";
import "./question.css";
import { useEffect, useContext } from "react";
import { QuizzContext } from "../Homepage1";

export default function Questions() {
  const { timer, len, question, dispatch, status, s1, length, index } =
    useContext(QuizzContext);
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "start" });
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  const min = Math.floor(timer / 60);
  const sec = Math.floor(timer % 60);
  return (
    <>
      <div>
        <input type="range" min="0" max={length} value={index + 1}></input>
        <h1>{question.question}</h1>

        {question.options.map((o, i) => {
          return (
            <div className={s1 === "active" ? "disable" : ""}>
              <p
                disabled={s1 === "active" ? true : false}
                className={
                  s1 === "active"
                    ? i === question.correctOption
                      ? "success"
                      : "error"
                    : ""
                }
                style={{
                  display: "block",
                  border: "solid",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  s1 !== "active" &&
                    dispatch({
                      type: "active",
                      payload: i,
                    });
                }}
              >
                {o}
              </p>
            </div>
          );
        })}
        {s1 === "active" && (
          <button
            onClick={() => {
              len ? dispatch({ type: "finish" }) : dispatch({ type: "next" });
            }}
          >
            {len ? "finish" : "next"}
          </button>
        )}
        <p>
          {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
        </p>
      </div>
    </>
  );
}
