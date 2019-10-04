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
    axios.post("/users/login", this.state);

    this.mock.onPost("/users/login").reply(200, {
      token: "fgewr234h482o3321j45o3j1"
    });
  }

  render() {
    return <div>Pagina Login</div>;
  }
}

export default Login;
