import React from "react";
import { useContext } from "react";
import { QuizzContext } from "../Homepage1";
export default function Score() {
  const { score, dispatch } = useContext(QuizzContext);
  return (
    <div>
      your score is{score}
      <button
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        restart
      </button>
    </div>
  );
}
