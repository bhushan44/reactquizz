import React, { useContext } from "react";
import { Homepage1 } from "./Homepage1";
import { Homepage2 } from "./Homepage2";

import { Routes, Route } from "react-router-dom";
import QuizzProvider from "./components/Quizz";
import MainPage from "./MainPage";
// import { QuizzContext } from "./components/Quizz";

export default function App() {
  // const { status } = useContext(QuizzContext);
  return (
    <QuizzProvider>
      <div>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}></Route>(
          <Route
            path="/homepage1/:name"
            element={<Homepage2></Homepage2>}
          ></Route>
          )
        </Routes>
        {/* <Homepage></Homepage> */}
      </div>
    </QuizzProvider>
  );
}
