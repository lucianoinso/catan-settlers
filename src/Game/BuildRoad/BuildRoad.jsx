import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./BuildRoad.ducks";

class BuildRoad extends React.Component {
  render() {
    if (this.props.isBuildingRoad) {
      return (
        <span>
          <button
            disabled={!this.props.selectedEdge}
            onClick={() => this.props.buildRoad(this.props.selectedEdge)}
          >
            Confirmar
          </button>
          <button onClick={this.props.endBuildingRoad}>Cancelar</button>
        </span>
      );
    }
    return (
      <button
        disabled={
          !this.props.availableEdges || !this.props.availableEdges.length
        }
        onClick={this.props.startBuildingRoad}
      >
        Construir portal
      </button>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildRoad);
