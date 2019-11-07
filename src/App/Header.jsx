import React, { Component } from "react";
import Logout from "../Logout/Logout.jsx";

class Header extends Component {
  render() {
    return (
      <header
        style={{
          textAlign: "center",
          padding: "20px 0",
          fontSize: "2em"
        }}
      >
        <Logout />
        <h1> Los colonos de satán</h1>
        <br />
      </header>
    );
  }
}

export default Header;
