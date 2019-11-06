import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./BuildSettlement.ducks";
import ChoosableHex from "./ChoosableHex";

class ChooseHex extends React.Component {
  render() {
    if (!this.props.isMovingRobber) return <span></span>;

    return (
      <div>
        {this.props.availableHex.map(({ level, index }) => (
          <ChoosableHex
            key={`(${level},${index})`}
            level={level}
            index={index}
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
