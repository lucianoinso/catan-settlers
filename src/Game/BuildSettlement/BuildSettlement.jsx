import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./BuildSettlement.ducks";

function BuildSettlement({
  id,
  availableVertices,
  beginBuildingSettlement,
  selectedVertex,
  isBuilding,
  endBuildingSettlement,
  buildSettlement
}) {
  if (!isBuilding)
    return (
      <button
        onClick={() => beginBuildingSettlement()}
        disabled={!availableVertices || availableVertices.length === 0}
      >
        Construir templo
      </button>
    );

  return (
    <span>
      <button
        disabled={!selectedVertex}
        onClick={() => buildSettlement({ vertex: selectedVertex, id: id })}
      >
        Confirmar
      </button>
      <button className="cancel" onClick={() => endBuildingSettlement()}>
        Cancelar
      </button>
    </span>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildSettlement);

export { BuildSettlement as UnconnectedBuildSettlement };
