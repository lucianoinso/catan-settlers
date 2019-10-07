import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Lobbies from "../Lobby/Lobbies";
import Game from "../Game/Game";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/rooms" component={Lobbies} />
        <Route path="/game/:id" component={Game} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
