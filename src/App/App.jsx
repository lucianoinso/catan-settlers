import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "../store.js";
import { Provider } from "react-redux";
import Header from "./Header";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Lobbies from "../Lobby/Lobbies";
import MyLobby from "../Lobby/MyLobby";
import Game from "../Game/Game";
import Footer from "./Footer";
import PopupController from "../PopupController/PopupController";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/rooms" component={Lobbies} />
        <Route path="/rooms/:id" component={MyLobby} />
        <Route path="/game/:id" component={Game} />
      </Switch>
      <Footer />
      <PopupController />
    </Provider>
  );
}

export default App;
