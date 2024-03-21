import React from "react";
// import "./question.css";
import { useEffect, useContext } from "react";
import { QuizzContext } from "./Quizz";

export default function Questions({ name }) {
  const { timer, len, question, dispatch, status, s1, length, index } =
    useContext(QuizzContext);
  useEffect(
    function () {
      dispatch({ type: "indexreset" });
      const id = setInterval(function () {
        dispatch({ type: "start" });
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    [dispatch],
  );
  const min = Math.floor(timer / 60);
  const sec = Math.floor(timer % 60);
  return (
    <>
      <div className=" flex flex-col items-center  justify-center p-5">
        <h1 className="   lg: pb-3  text-3xl text-white lg:text-7xl ">
          {name} Quizz
        </h1>
        <input
          className="w-2/3"
          m-20
          type="range"
          min="0"
          max={length}
          value={index + 1}
        ></input>
        <h1 className="pt-6  text-2xl text-white lg:text-4xl">
          {question.question}
        </h1>
        <div className="  boreder mt-3 flex  w-3/4  flex-col  items-center  justify-center gap-5 border border-red-50 p-5 lg:mt-20">
          {question.options.map((o, i) => {
            return (
              <div
                id={i}
                className="w-3/4 rounded border border-white text-center text-white"
              >
                <p
                  disabled={s1 === "active" ? true : false}
                  className={
                    s1 === "active"
                      ? i === question.correctOption
                        ? " min-w-full bg-green-600 text-center"
                        : "min-w-full bg-red-600"
                      : ""
                  }
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
          <div className=" flex gap-10  pt-2 lg:gap-20 lg:pt-4">
            {s1 === "active" && (
              <button
                className="rounded bg-blue-500 p-1"
                onClick={() => {
                  len
                    ? dispatch({ type: "finish" })
                    : dispatch({ type: "next" });
                }}
              >
                {len ? "finish" : "next"}
              </button>
            )}
            <p className="rounded bg-blue-500 p-1">
              {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
