import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { route } from "./Signup.ducks";
import { logIn } from "../Login/Login.ducks";
import store from "../store";
import PopupController from "../PopupController/PopupController";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      failed: false,
      isLogged: Boolean(localStorage.getItem("token"))
    };
  }

  validateForm(username, password) {
    return (
      username && username.length > 0 && (password && password.length === 8)
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm(this.state.username, this.state.password)) {
      const payload = {
        username: this.state.username,
        password: this.state.password
      };
      axios
        .post(route, payload)
        .then(res => {
          this.handleResponse(res);
        })
        .catch(error => {
          console.log(error);
          PopupController.pushError({
            content: error.response.data
          });
        });
    } else {
      PopupController.pushError({
        content: "Longitud de firma invalida (longitud requerida: 8 caracteres)"
      });
    }
  };

  handleResponse = res => {
    if (res.status === 201) {
      console.log("success!");
      console.log(res);

      // Call to Login with new username and password
      const payload = {
        username: this.state.username,
        password: this.state.password
      };
      logIn(payload, store.dispatch);
      this.setState({ isLogged: true });
    } else {
      // TODO: show status code error
      this.setState({ failed: true });
    }
  };

  handleChange = event => {
    if (event.target.id === "username") {
      this.setState({ username: event.target.value });
    }
    if (event.target.id === "password") {
      this.setState({ password: event.target.value });
    }
  };

  render() {
    if (this.state.failed) {
      return <p>"Something went very wrong"</p>;
    }
    if (!this.state.isLogged) {
      return (
        <div id="registerForm" style={{ textAlign: "center", width: "100%" }}>
          <form
            className="regist-log-form"
            onSubmit={this.handleSubmit}
            style={{
              display: "inline-block",
              margin: "0 auto",
              width: "413px"
            }}
          >
            <fieldset style={{ border: "4px double red" }}>
              <legend>Contrato</legend>
              <p>
                <label className="regInput" htmlFor="username">
                  Identificador de alma
                </label>
                <br />
                <input type="text" id="username" onChange={this.handleChange} />
              </p>
              <p>
                <label className="regInput" htmlFor="password">
                  Firma
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  onChange={this.handleChange}
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
                  style={{ padding: "7px 15px 8px 15px" }}
                >
                  Firmar contrato
                </button>
              </p>
            </fieldset>
          </form>
          <div>
            ¿Ya vendiste tu alma?
            <Link to="/users/login">Entrar al infierno</Link>
          </div>
        </div>
      ); // End return (not logged in)
    }
    return <Redirect to="/rooms/" />;
  } // End Render
} // End Signup class

export default Signup;
