import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Robber.ducks";
import ChoosableHex from "./ChoosableHex";

export function checkRobberKnight(availableRobber, availableKnight) {
  return availableRobber === false ? availableKnight : availableRobber;
}

class ChooseHex extends React.Component {
  render() {
    // console.log(this.props.availableRobber);
    if (!this.props.isMovingRobber) return <span />;
    const availableThing = checkRobberKnight(
      this.props.availableRobber,
      this.props.availableKnight
    );
    return (
      <div>
        {availableThing.map(Hex => (
          <ChoosableHex
            key={`(${Hex.position.level},${Hex.position.index})`}
            level={Hex.position.level}
            index={Hex.position.index}
            chosenHex={this.props.selectedHex}
          />
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseHex);
