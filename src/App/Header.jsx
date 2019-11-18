import React, { Component } from "react";
import Logout from "../Logout/Logout.jsx";

class Header extends Component {
  render() {
    return (
      <header
        style={{
          textAlign: "center",
          padding: "5px 0px 20px 0px",
          fontSize: "2em"
        }}
      >
        <Logout />
        <div id="gameTitle">
          <h1> Los colonos de satán</h1>
          <br />
        </div>
      </header>
    );
  }
}

export default Header;
