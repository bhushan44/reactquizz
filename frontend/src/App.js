import React from "react";
import { Homepage1 } from "./Homepage1";
import Homepage2 from "./Homepage2";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route
          path="/homepage1/:name"
          element={<Homepage1></Homepage1>}
        ></Route>
      </Routes>
      {/* <Homepage></Homepage> */}
    </div>
  );
}
