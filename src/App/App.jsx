import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/rooms" component={Lobbies} />
          <Route path="/rooms/:id" component={MyLobby} />
          <Route path="/games/:id" component={Game} />
        </Switch>
      </BrowserRouter>
      <Footer />
      <PopupController />
    </Provider>
  );
}

export default App;
