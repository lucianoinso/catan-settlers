import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./BuildSettlement.ducks";
import ChoosableVertex from "./ChoosableVertex";

class ChooseVertex extends React.Component {
  render() {
    if (!this.props.isBuilding) return <span></span>;

    return (
      <div>
        {this.props.availableVertices.map(({ level, index }) => (
          <ChoosableVertex
            key={`(${level},${index})`}
            level={level}
            index={index}
            chosenVertex={this.props.selectedVertex}
          />
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseVertex);

export { ChooseVertex as UnconnectedChooseVertex };