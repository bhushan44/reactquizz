import React, { useState } from "react";
import react from "./components/images/react.jpg";
import html from "./components/images/html.jpg";
import css from "./components/images/css.jpg";
import js from "./components/images/js.jpg";
import node from "./components/images/node.jpg";
import express from "./components/images/express.jpg";
import mongo from "./components/images/mongo.jpg";
import { Link } from "react-router-dom";
export default function MainPage() {
  const [image, setimage] = useState([
    html,
    css,
    js,
    react,
    node,
    express,
    mongo,
  ]);
  const [name, setname] = useState([
    "html",
    "css",
    "js",
    "react",
    "node",
    "express",
    "mongo",
  ]);
  // const [index, setindex] = useState(0);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MERN QuizMaster</h1>

      <div
        style={{
          display: "flex",
          // flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          margin: "50px",
          width: "100%",
        }}
      >
        {/* <Link to="/homepage/react">
        <img src={react} alt="bhushan" width="500px" height="500px"></img>
      </Link>
      <Link to="/">bhusa</Link> */}

        {image.map((o, i) => {
          return (
            <div>
              <Link to={`/homepage1/${name[i]}`}>
                <img src={o} alt="bhushan" width="300px" height="300px"></img>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
