import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  greeting() {
    const isLoggedIn = this.state.userName;
    if (isLoggedIn) {
      return <h4>Welcome {this.state.userName}</h4>;
    } else {
      return <Link to="/Users/Login"> Login</Link>;
    }
  }

  render() {
    return (
      // <div id="login">{this.greeting()}</div>
      <div>Main Page</div>
    );
  }
}

export default Home;
