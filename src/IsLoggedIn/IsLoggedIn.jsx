import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { mapDispatchToProps, mapStateToProps } from "../Login/Login.ducks";

class IsLoggedIn extends React.Component {
  render() {
    if (!this.props.isLogged) {
      return <Redirect to={`/users/login`} />;
    } else {
      return "";
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IsLoggedIn);
