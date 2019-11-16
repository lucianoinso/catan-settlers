import apiURL from "../../api";
import axios from "axios";
import PopupController from "../../PopupController/PopupController";
import { updateCards } from "../DevCard/DevCards.ducks";
import { updateGameStatus } from "../Status.ducks";

const START_ROAD_BUILDING = "start_road_building_card";
const CONFIRM_ROAD_BUILDING = "confirm_road_building_card";
const CANCEL_ROAD_BUILDING = "cancel_road_building_card";
const SELECT_EDGE = "select_edge_for_road_building_card";

const initialState = {
  isPlayingRoadBuilding: false,
  selectedEdges: null
};

const roadBuildingCardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_ROAD_BUILDING:
      return { isPlayingRoadBuilding: true, selectedEdges: [] };
    case CONFIRM_ROAD_BUILDING:
    case CANCEL_ROAD_BUILDING:
      return { isPlayingRoadBuilding: false, selectedEdges: null };
    case SELECT_EDGE:
      return {
        isPlayingRoadBuilding: true,
        selectedEdges: [payload, ...state.selectedEdges].slice(0, 2)
      };
    default:
      return state;
  }
};

function startRoadBuilding(payload, dispatch) {
  dispatch({
    type: START_ROAD_BUILDING
  });
}

function confirmRoadBuilding(payload, dispatch) {
  if (payload.id === null) return;

  axios
    .post(`${apiURL}/games/${payload.id}/player/actions`, {
      type: "play_road_building_card",
      payload: payload.selectedEdges
    })
    .then(response => {
      dispatch({ type: CONFIRM_ROAD_BUILDING });
      // Update cards
      updateCards(payload, dispatch);
      // Update roads
      updateGameStatus(payload, dispatch);
    })
    .catch(error => {
      console.error(error);
      PopupController.pushError({
        content: `Hubo un error al usar Conjuro de Malphas`
      });
    });
}

function cancelRoadBuilding(payload, dispatch) {
  dispatch({
    type: CANCEL_ROAD_BUILDING
  });
}

function selectEdge(payload, dispatch) {
  dispatch({
    type: SELECT_EDGE,
    payload
  });
}

const mapState = state => ({
  id: state.game.status.id,
  isPlayingRoadBuilding: state.game.roadBuildingCard.isPlayingRoadBuilding,
  selectedEdges: state.game.roadBuildingCard.selectedEdges,
  availableEdges: state.game.actions.play_road_building_card
});

const mapDispatch = dispatch => ({
  startRoadBuilding: payload => startRoadBuilding(payload, dispatch),
  confirmRoadBuilding: payload => confirmRoadBuilding(payload, dispatch),
  cancelRoadBuilding: payload => cancelRoadBuilding(payload, dispatch),
  selectEdge: payload => selectEdge(payload, dispatch)
});

export { roadBuildingCardReducer, mapState, mapDispatch, selectEdge };
