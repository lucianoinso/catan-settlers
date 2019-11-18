import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Login.ducks.js";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    if (this.props.isLogged) {
      return <Redirect to="/rooms" />;
    }

    return (
      <div id="registerForm">
        <form
          className="regist-log-form"
          onSubmit={event => {
            this.props.logIn({
              username: this.state.username,
              password: this.state.password
            });
            event.preventDefault();
          }}
        >
          <fieldset>
            <legend>Reanudar contrato</legend>
            <p>
              <label className="regInput" htmlFor="username">
                Identificador de alma
              </label>
              <br />
              <input
                type="text"
                id="username"
                onChange={e => this.setState({ username: e.target.value })}
              />
            </p>
            <p>
              <label className="regInput" htmlFor="password">
                Firma
              </label>
              <br />
              <input
                type="password"
                id="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <span style={{ fontSize: "12px" }}>
                <br />
                (exactamente 8 caracteres)
              </span>
            </p>
            <p>
              <br />
              <button
                type="submit"
                disabled={!this.state.username || !this.state.password}
              >
                Ingresar...
              </button>
            </p>
          </fieldset>
        </form>
        <div>
          ¿Primera vez? <Link to="/"> Identifica tu alma</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
