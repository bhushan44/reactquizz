import React from "react";

export default function Score({ score, dispatch }) {
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
