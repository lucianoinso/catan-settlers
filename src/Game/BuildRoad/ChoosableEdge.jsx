import React from "react";
import Road from "./Road";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./BuildRoad.ducks";
import "./ChoosableEdge.css";

const SELECTED_EDGE_COLOR = "white";
const UNSELECTED_EDGE_COLOR = "#bbb";

export function edgeEquality(edge0, edge1) {
  return (
    edge0 &&
    edge1 &&
    vertexEquality(edge0[0], edge1[0]) &&
    vertexEquality(edge0[1], edge1[1])
  );
}

const vertexEquality = (vertex0, vertex1) =>
  vertex0.level === vertex1.level && vertex0.index === vertex1.index;

function ChoosableEdge({ edge, selectEdge, selectedEdge }) {
  const selected = edgeEquality(edge, selectedEdge);
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
  mapStateToProps,
  mapDispatchToProps
)(ChoosableEdge);
