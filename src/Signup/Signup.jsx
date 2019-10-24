import React, { Component } from "react";
import { route } from "./Signup.ducks";
import { Redirect } from "react-router-dom";
import { logIn } from "../Login/Login.ducks";
import store from "../store";
import PopupController from "../PopupController/PopupController";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pass: "",
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
    if (this.validateForm(this.state.user, this.state.pass)) {
      const payload = { user: this.state.user, pass: this.state.pass };
      axios
        .post(route, payload)
        .then(res => {
          this.handleResponse(res);
        })
        .catch(error => {
          console.log(error);
          PopupController.pushError({
          content:
            "Ha ocurrido un error con la comunicación con el servidor"
          });
        });
    } else {
      PopupController.pushError({
        content:
          "Longitud de password invalida (longitud requerida: 8 caracteres)"
      });
    }
  };

  handleResponse = res => {
    if (res.status === 200) {
      console.log("success!");
      console.log(res);

      // Call to Login with new user and pass
      const payload = { user: this.state.user, pass: this.state.pass };
      logIn(payload, store.dispatch);
      this.setState({ isLogged: true });
    } else {
      // TODO: show status code error
      this.setState({ failed: true });
    }
  };

  handleChange = event => {
    if (event.target.id === "username") {
      this.setState({ user: event.target.value });
    }
    if (event.target.id === "password") {
      this.setState({ pass: event.target.value });
    }
  };

  render() {
    if (this.state.failed) {
      return <p>"Something went very wrong"</p>;
    } else if (!this.state.isLogged) {
      return (
        <div id="registerForm" style={{ textAlign:'center', width:'100%' }}>
          <form className = "regist-log-form" onSubmit={this.handleSubmit} style={{ display:'inline-block', margin: '0 auto', width:'413px'}}>
            <fieldset style={{ border:'4px double red' }}>
              <legend>Registro</legend>
              <p>
                <label className = "regInput" htmlFor="username">Nombre de usuario</label> <br/>
                <input type="text" id="username" onChange={this.handleChange} />
              </p>
              <p>
                <label className = "regInput" htmlFor="password">Password</label> <br/>
                <input
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                />
                <span style={{ fontSize: "12px" }}>
                  <br/>(exactamente 8 caracteres)
                </span>
              </p>
              <p> <br />
                <button
                  type="submit"
                  disabled={!this.state.user || !this.state.pass}
                  style={{padding: '7px 15px 8px 15px'}}
                >
                  Registrarse
                </button>
              </p>
            </fieldset>
          </form>
        </div>
      ); // End return (not logged in)
    } else {
      return <Redirect to="/rooms/" />;
    }
  } // End Render
} // End Signup class

export default Signup;
