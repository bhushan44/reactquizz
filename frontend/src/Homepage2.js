import React from "react";
import QuizzProvider from "./components/Quizz";
import { QuizzContext } from "./components/Quizz";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "./components/Loading";
import { useEffect } from "react";
import Questions from "./components/questions";
import Score from "./components/Score";
export function Homepage2() {
  const { name } = useParams();
  const { status, questions, dispatch } = useContext(QuizzContext);
  useEffect(
    function () {
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
    },
    [name, dispatch],
  );

  return (
    <div className=" h-screen  bg-slate-800 ">
      {/* <QuizzProvider name={name}> */}
      {status === "loading" && <Loading></Loading>}
      {status === "error" && <h1>error</h1>}
      {status === "ready" && (
        <>
          {" "}
          <h1 className="pt-20 text-center text-7xl text-white">
            {name} quizz
          </h1>
          <h1 className=" pt-3 text-center text-3xl text-white lg:text-5xl">
            welcome to the {name}
          </h1>
          <p className="pt-3 text-center  text-2xl text-white lg:text-3xl">
            {questions?.length} questions to test your {name} knowledge
          </p>
          <div className=" flex justify-center pt-5">
            <button
              className=" h-auto w-auto  rounded bg-blue-600 p-3 pt-3 text-3xl text-white"
              type="button"
              onClick={() => {
                console.log("button");
                dispatch({ type: "start" });
              }}
            >
              start
            </button>
          </div>
        </>
      )}

      {status === "start" && <Questions name={name}></Questions>}
      {status === "finish" && <Score></Score>}
      {/* </QuizzProvider> */}
    </div>
  );
}
