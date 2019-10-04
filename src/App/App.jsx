import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Lobby from "../Lobby/Lobby";
import Game from "../Game/Game";
import Footer from "./Footer";

class App extends React.Component {
  constructor(props) {
    alert('hola');
    // this.userToken = props.userToken;
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/login" component={Login} />
          <Route exact path="/rooms" component={Lobby} />
          <Route path="/game/:id" component={Game} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
