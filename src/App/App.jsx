import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Lobby from "../Lobby/Lobby";
import Game from "../Game/Game";
import Footer from "./Footer";
import PopupController from "../PopupController/PopupController";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/rooms" component={Lobby} />
          <Route path="/game/:id" component={Game} />
        </Switch>
      </BrowserRouter>
      <Footer />
      <PopupController />
    </div>
  );
}

export default App;
