import React, { Component } from "react";
import Logout from "../Logout/Logout.jsx";

class Header extends Component {
  render() {
    return (
      <header
        style={{
          textAlign: "center",
          margin: "0 0 0.3em 0",
          fontSize: "2em"
        }}
      >
        <Logout />
        <div
          id="gameTitle"
          style={{
            fontSize: "0.5em"
          }}
        >
          <h1>Los colonos de satán</h1>
        </div>
      </header>
    );
  }
}

export default Header;
