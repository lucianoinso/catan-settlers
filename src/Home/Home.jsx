import React from "react";
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
