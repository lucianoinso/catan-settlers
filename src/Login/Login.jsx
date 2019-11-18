import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Login.ducks.js";
import "./Login.css";

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
      <div id="registerForm">
        <form
          className="regist-log-form"
          onSubmit={event => {
            this.props.logIn({
              user: this.state.user,
              pass: this.state.pass
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
                onChange={e => this.setState({ user: e.target.value })}
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
                onChange={e => this.setState({ pass: e.target.value })}
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
                disabled={!this.state.user || !this.state.pass}
              >
                Ingresar...
              </button>
            </p>
          </fieldset>
        </form>
        <div>
          ¿Primera vez?           <Link to="/"> Identifica tu alma</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
