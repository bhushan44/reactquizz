import React from "react";
import { useContext } from "react";
import { QuizzContext } from "./Quizz";
export default function Score() {
  const { score, dispatch } = useContext(QuizzContext);
  return (
    <div className="flex h-screen  flex-col items-center  justify-center gap-20">
      <h1 className=" text-4xl text-white lg:text-7xl">
        your score is :{score}
      </h1>
      <button
        className="   w-auto rounded bg-blue-400 p-3 text-lg"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        restart
      </button>
    </div>
  );
}
