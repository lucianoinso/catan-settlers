import {
  mapStateToProps as buildMapState,
  mapDispatchToProps as buildMapDispatch
} from "./BuildRoad.ducks";
import {
  mapState as cardMapState,
  mapDispatch as cardMapDispatch
} from "../RoadBuilding/RoadBuilding.ducks";

// Mezclamos los mapToProps de dos archivos diferentes.

function mapStateToProps(state) {
  const buildProps = buildMapState(state);
  const cardProps = cardMapState(state);

  return {
    ...buildProps,
    ...cardProps,
    // conflicts:
    buildRoadAvailableEdges: buildProps.availableEdges,
    roadBuildingAvailableEdges: cardProps.availableEdges
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...buildMapDispatch(dispatch),
    ...cardMapDispatch(dispatch)
  };
}

export { mapStateToProps, mapDispatchToProps };
