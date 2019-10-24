import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Signup from "../Signup/Signup";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  render() {
    return <Signup />;
  }
}

export default Home;
