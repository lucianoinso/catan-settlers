import React from "react";
import Road from "../BuildRoad/Road";
import { connect } from "react-redux";
import { mapState, mapDispatch } from "./RoadBuilding.ducks";
import "../BuildRoad/ChoosableEdge.css";
import {
  edgeEquality,
  SELECTED_EDGE_COLOR,
  UNSELECTED_EDGE_COLOR
} from "../BuildRoad/ChoosableEdge";

function ChoosableEdge2({ edge, selectEdge, selectedEdges }) {
  const selected = selectedEdges.some(selectedEdge =>
    edgeEquality(edge, selectedEdge)
  );
  const color = selected ? SELECTED_EDGE_COLOR : UNSELECTED_EDGE_COLOR;

  return (
    <span
      className={`choosable-edge ${selected ? "selected" : ""}`}
      onClick={() => selectEdge(edge)}
    >
      <Road
        road={{
          edge,
          owner: "Construir portal aquí",
          color
        }}
        selectable={true}
      />
    </span>
  );
}

export default connect(
  mapState,
  mapDispatch
)(ChoosableEdge2);

export { ChoosableEdge2 };
