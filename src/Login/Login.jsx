import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pass: ""
    };

    this.mock = new MockAdapter(axios);
  }

  componentDidMount() {
    this.mock.onPost("/users/login").reply(200, {
      token: "fgewr234h482o3321j45o3j1"
    });
  }

  onSubmit = e => {
    // TODO: check if one of the fields is empty before making the request
    // and give an error using the popup in each case
    axios
      .post("/users/login", this.state)
      .catch(error => {
        // TODO: handle errors and use the global popup to show them
        alert(error);
      })
      .then(f => {
        // TODO: Update the app state with the token
        console.log(f);
      });

    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
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

