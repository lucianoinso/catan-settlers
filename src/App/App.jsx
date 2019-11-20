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
import Signup from "../Signup/Signup";
import GameHeader from "./GameHeader";

const InvalidUrl = () => {
  return (
    <div id="404-page" style={{ textAlign: "center" }}>
      <h3
        style={{
          width: "400px",
          textAlign: "center",
          color: "white",
          margin: "auto"
        }}
      >
        Error 404: La puerta del Infierno no se encuentra acá
      </h3>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/games/:id" component={GameHeader} />
          <Route component={Header} />
        </Switch>
      </BrowserRouter>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/" component={Signup} />
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/rooms" component={Lobbies} />
          <Route exact path="/rooms/:id" component={MyLobby} />
          <Route exact path="/games/:id" component={Game} />
          <Route component={InvalidUrl} />
        </Switch>
      </BrowserRouter>
      <Footer />
      <PopupController />
    </Provider>
  );
}

export default App;
