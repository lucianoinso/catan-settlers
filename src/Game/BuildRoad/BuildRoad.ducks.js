import axios from "axios";
import apiURL from "../../api";
import { updateGameStatus } from "../Status.ducks";
import { updateAvailableActions } from "../Actions.ducks";
import { updateResources } from "../Resources/Resources.ducks";
import PopupController from "../../PopupController/PopupController";

const START_BUILDING_ROAD = "start_building_road";
const END_BUILDING_ROAD = "end_building_road";
const SELECT_EDGE = "select_edge";
const BUILD_ROAD = "build_road";

const initialState = {
  isBuildingRoad: false,
  selectedEdge: null
};

const buildRoadReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_BUILDING_ROAD:
    case END_BUILDING_ROAD:
    case BUILD_ROAD:
      return {
        isBuildingRoad: type === START_BUILDING_ROAD,
        selectedEdge: null
      };
    case SELECT_EDGE:
      return { ...state, selectedEdge: payload };
    default:
      return state;
  }
};

const startBuildingRoad = (_, dispatch) => {
  dispatch({
    type: START_BUILDING_ROAD,
    payload: null
  });
};

const endBuildingRoad = (_, dispatch) => {
  dispatch({
    type: END_BUILDING_ROAD,
    payload: null
  });
};

const selectEdge = (edge, dispatch) => {
  dispatch({
    type: SELECT_EDGE,
    payload: edge
  });
};

const buildRoad = (payload, dispatch) => {
  const id = 1; // me da dolor de panza cada vez que hago esto xD
  axios
    .post(`${apiURL}/games/${id}/player/actions/`, {
      type: "build_road",
      payload
    })
    .then(_ => {
      endBuildingRoad(null, dispatch);
      updateGameStatus(null, dispatch);
      updateAvailableActions(null, dispatch);
      updateResources(null, dispatch);
    })
    .catch(error => {
      endBuildingRoad(null, dispatch);
      PopupController.pushError({
        content: `Hubo un error al construir portal.`
      });
      console.error(error);
    });
};

const mapStateToProps = state => ({
  roads: state.game.status.roads,
  isBuildingRoad: state.game.buildRoad.isBuildingRoad,
  selectedEdge: state.game.buildRoad.selectedEdge,
  availableEdges: state.game.actions.build_road
});

const mapDispatchToProps = dispatch => ({
  startBuildingRoad: _ => startBuildingRoad(_, dispatch),
  endBuildingRoad: _ => endBuildingRoad(_, dispatch),
  selectEdge: edge => selectEdge(edge, dispatch),
  buildRoad: edge => buildRoad(edge, dispatch)
});

export { mapStateToProps, mapDispatchToProps, buildRoadReducer, selectEdge };
