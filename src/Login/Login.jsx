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
      return <Redirect to="/rooms" />;
    }

    return (
      <div id="registerForm" style={{ textAlign: "center", width: "100%" }}>
        <form
          className="regist-log-form"
          onSubmit={event => {
            this.props.logIn({
              user: this.state.user,
              pass: this.state.pass
            });
            event.preventDefault();
          }}
          style={{
            display: "inline-block",
            margin: "0 auto",
            width: "413px"
          }}
        >
          <fieldset style={{ border: "4px double red" }}>
            <legend>Login</legend>
            <p>
              <label className="regInput" htmlFor="username">
                Nombre de usuario
              </label>
              <br />
              <input
                type="text"
                id="username"
                onChange={e => this.setState({ user: e.target.value })}
              />
            </p>
            <p>
              <label className="regInput" htmlFor="password">
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                onChange={e => this.setState({ pass: e.target.value })}
              />
            </p>
            <p>
              {" "}
              <br />
              <button
                type="submit"
                disabled={!this.state.user || !this.state.pass}
                style={{ padding: "7px 15px 8px 15px", marginTop: "25px" }}
              >
                Login
              </button>
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
