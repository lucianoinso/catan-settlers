import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Login.ducks.js";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pass: ""
    };
  }

  render() {
    if (this.props.isLogged) {
      return <Redirect to="/" />;
    }

    return (
      <form
        onSubmit={event => {
          this.props.logIn({
            user: this.state.user,
            pass: this.state.pass
          });
          event.preventDefault();
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
            <button
              type="submit"
              disabled={!this.state.user || !this.state.pass}
            >
              Login
            </button>
          </p>
        </fieldset>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
