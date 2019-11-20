import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../Status.ducks";

class WinGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: ""
    };
  }

  render() {
    if (this.props.winner) {
      return (
        <div className="playerWon" style={{ fontSize: "46px", float:"right", position:"relative"}}>
          <span style={{ color: "#FF1122" }}>{this.props.winner}</span> ha
          conquistado el infierno
        </div>
      );
    } 
      return "";
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WinGame);
