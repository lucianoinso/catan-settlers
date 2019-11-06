import React from "react";
import Road from "./Road";
import ChoosableEdge from "./ChoosableEdge";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./BuildRoad.ducks";

const getKeyFromEdge = edge =>
  `(${edge[0].level},${edge[0].index},${edge[1].level},${edge[1].index})`;

export function Roads({ roads, isBuildingRoad, availableEdges, endBuildingRoad }) {
  const makeRoad = road => <Road road={road} key={getKeyFromEdge(road.edge)} />;
  const makeEdge = edge => (
    <ChoosableEdge edge={edge} key={getKeyFromEdge(edge)} />
  );

  if (!availableEdges) {
    // Por alguna razón, la API nos está diciendo que
    // build_road ya no es una acción disponible.
    endBuildingRoad();
  }

  return (
    <div className="roads">
      {roads.map(makeRoad)}
      {isBuildingRoad && availableEdges ? availableEdges.map(makeEdge) : ""}
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roads);
