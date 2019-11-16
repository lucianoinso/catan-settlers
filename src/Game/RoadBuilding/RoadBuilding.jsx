import React from "react";
import { mapState, mapDispatch } from "./RoadBuilding.ducks";
import { connect } from "react-redux";

function RoadBuilding(props) {
  if (props.isPlayingRoadBuilding) {
    if (!props.selectedEdges) {
      props.cancelRoadBuilding();
      return "";
    }

    const cannotConfirm =
      !props.availableEdges ||
      !props.availableEdges.length ||
      (props.availableEdges.length >= 2 && props.selectedEdges.length < 2) ||
      props.selectedEdges.length < 1;
    return (
      <span>
        <button
          onClick={() =>
            props.confirmRoadBuilding({
              id: props.id,
              selectedEdges: props.selectedEdges
            })
          }
          className="confirm"
          disabled={cannotConfirm}
          title="Selecciona dos lugares vacíos para construir portales"
        >
          Confirmar
        </button>
        <button onClick={() => props.cancelRoadBuilding()} className="cancel">
          Cancelar
        </button>
      </span>
    );
  }

  return (
    <button
      disabled={!props.availableEdges || !props.availableEdges.length}
      onClick={() => props.startRoadBuilding()}
      title='La carta "Conjuro de Malphas" te deja construir dos portales'
    >
      Usar Conjuro de Malphas
    </button>
  );
}

export default connect(
  mapState,
  mapDispatch
)(RoadBuilding);
