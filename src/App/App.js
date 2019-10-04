import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from "./Header.js";
import Home from "../Home/Home.js";
import Login from "../Login/Login.js";
import Lobby from "../Lobby/Lobby.js";
import Game from "../Game/Game.js";
import Footer from "./Footer.js";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}  />
        <Route exact path="/login" component={Login} />
        <Route exact path="/rooms" component={Lobby} />
        <Route path="/game/:id" component={Game} />
      </Switch> 
      <Footer />
    </div>
  );
}

export default App;
