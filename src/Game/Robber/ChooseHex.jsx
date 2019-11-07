import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Robber.ducks";
import ChoosableHex from "./ChoosableHex";

class ChooseHex extends React.Component {
  render() {
    if (!this.props.isMovingRobber) return <span />;
    return (
      <div>
        {this.props.availableHexes.map(Hex => (
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
