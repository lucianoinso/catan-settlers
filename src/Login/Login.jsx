import React from "react";
import axios from "axios";
import axiosMock from "../App/axiosMock.js";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pass: "",
      token: "",
      redirect: false
    };
  }

  componentDidMount() {
    axiosMock.onPost("/users/login").reply(200, {
      token: "fgewr234h482o3321j45o3j1"
    });
  }

  onSubmit() {
    const { onLogin } = this.props;
    // TODO: check if one of the fields is empty before making the request
    // and give an error using the popup in each case
    const { user } = this.state;
    axios
      .post("/users/login", this.state)
      .catch(error => {
        // TODO: handle errors and use the global popup to show them
        alert(error);
      })
      .then(response => {
        onLogin(user, response.data.token);
        this.setState({
          user: user,
          token: response.data.token,
          redirect: true
        });
      });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.onSubmit();
        }}
      >
        <fieldset>
          <legend>Login</legend>
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={e => this.setState({ user: e.target.value })}
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={e => this.setState({ pass: e.target.value })}
            />
          </p>
          <p>
            <button type="submit">Login</button>
          </p>
        </fieldset>
      </form>
    );
  }
}

export default Login;
