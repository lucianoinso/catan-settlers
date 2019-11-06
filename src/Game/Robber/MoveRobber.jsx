import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Robber.ducks";

function MoveRobber({
  availableHex,
  beginMoveRobber,
  selectedHex,
  isMovingRobber,
  endMoveRobber,
  moveRobber
}) {
  if (!isMovingRobber)
    return (
      <button
        onClick={() => beginMoveRobber()}
        disabled={!availableHex || availableHex.length === 0}
      >
        Dar mal augurio
      </button>
    );

  return (
    <span>
      <button disabled={!selectedHex} onClick={() => MoveRobber(selectedHex)}>
        Confirmar
      </button>
      <button className="cancel" onClick={() => endMoveRobber()}>
        Cancelar
      </button>
    </span>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveRobber);
