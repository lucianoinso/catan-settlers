import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../Status.ducks.js";

class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.props.saveStatus();
  }

  render() {
    return (
      <div className="dices">
        Tirada de dados de : {this.props.currentPlayer} <br />
        Primer dado: {this.props.dices[0]} <br />
        Segundo dado: {this.props.dices[1]}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dice);
