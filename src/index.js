import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import PopupController from "./PopupController/PopupController";

ReactDOM.render(
  <BrowserRouter>
    <App />
    <PopupController />
  </BrowserRouter>,
  document.getElementById("root")
);
