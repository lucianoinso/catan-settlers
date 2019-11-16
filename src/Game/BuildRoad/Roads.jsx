import React from "react";
import Road from "./Road";
import ChoosableEdge from "./ChoosableEdge";
import ChoosableEdge2 from "../RoadBuilding/ChoosableEdge2";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Roads.ducks";

const getKeyFromEdge = edge =>
  `(${edge[0].level},${edge[0].index},${edge[1].level},${edge[1].index})`;

export function Roads({
  roads,
  isBuildingRoad,
  isPlayingRoadBuilding,
  buildRoadAvailableEdges,
  roadBuildingAvailableEdges,
  endBuildingRoad,
  cancelRoadBuilding
}) {
  const makeRoad = road => <Road road={road} key={getKeyFromEdge(road.edge)} />;
  const makeEdge = edge => (
    <ChoosableEdge edge={edge} key={getKeyFromEdge(edge)} />
  );
  const makeEdge2 = edge => (
    <ChoosableEdge2 edge={edge} key={getKeyFromEdge(edge)} />
  );

  if (!buildRoadAvailableEdges)
    endBuildingRoad();
  
  if (!roadBuildingAvailableEdges)
    cancelRoadBuilding();
  

  return (
    <div className="roads">
      {roads.map(makeRoad)}
      {isBuildingRoad && buildRoadAvailableEdges ? buildRoadAvailableEdges.map(makeEdge) : ""}
      {isPlayingRoadBuilding && roadBuildingAvailableEdges ? roadBuildingAvailableEdges.map(makeEdge2) : ""}
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roads);
