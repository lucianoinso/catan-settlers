import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import Header from "./Header";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Lobby from "../Lobby/Lobby";
import Game from "../Game/Game";
import Footer from "./Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userToken: ""
    };
  }

  async setAppState(user, token) {
    await this.setState({
      userName: user,
      userToken: token
    });
  }

  greeting() {
    const isLoggedIn = this.state.userName;
    if (isLoggedIn) {
      return <h4>Welcome {this.state.userName}</h4>;
    } else {
      return <Link to="/Users/Login"> Login</Link>;
    }
  }

  render() {
    return (
      <div id="App">
        <Header />
        <div id="login">{this.greeting()}</div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/users/login"
            render={() => (
              <Login onLogin={(user, token) => this.setAppState(user, token)} />
            )}
          />
          <Route exact path="/rooms" component={Lobby} />
          <Route path="/game/:id" component={Game} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
