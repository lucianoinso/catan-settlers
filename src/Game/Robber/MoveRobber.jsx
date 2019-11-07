import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { mapStateToProps, mapDispatchToProps } from "./Robber.ducks";
import ChoosePlayer from "./ChoosePlayer.jsx";

class MoveRobber extends React.Component {
  render() {
    if (!this.props.isMovingRobber)
      return (
        <button
          type="button"
          onClick={() => this.props.beginMoveRobber()}
          disabled={!this.props.availableHexes}
        >
          Dar mal augurio
        </button>
      );
    return (
      <span>
        <Popup
          trigger={(
            <button type="button" disabled={!this.props.selectedHex}>
              Confirmar lugar
            </button>
          )}
          modal
        >
          <ChoosePlayer />
        </Popup>
        <button
          className="cancel"
          type="button"
          onClick={() => this.props.endMoveRobber()}
        >
          Cancelar
        </button>
      </span>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveRobber);
