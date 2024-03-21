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
    <div className=" lg: lg: bg-slate-800 pt-20 ">
      <h1 className=" lg: fixed top-0  w-full bg-slate-300 text-center text-3xl  text-white lg:text-5xl">
        MERN QuizMaster
      </h1>

      <div className=" m-30 flex flex-row flex-wrap justify-center gap-3">
        {/* <Link to="/homepage/react">
        <img src={react} alt="bhushan" width="500px" height="500px"></img>
      </Link>
      <Link to="/">bhusa</Link> */}

        {image.map((o, i) => {
          return (
            <div>
              <Link to={`/homepage1/${name[i]}`}>
                <img
                  src={o}
                  alt="bhushan"
                  className=" h-60 w-60 lg:h-96 lg:w-96"
                ></img>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
