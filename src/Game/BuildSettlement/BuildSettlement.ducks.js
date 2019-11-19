import axios from "axios";
import PopupController from "../../PopupController/PopupController";
import apiURL from "../../api";


const BEGIN_BUILDING_SETTLEMENT = "begin_building_settlement";
const END_BUILDING_SETTLEMENT = "end_building_settlement";
const BUILD_SETTLEMENT = "build_settlement";
const CHOOSE_SETTLEMENT_VERTEX = "choose_settlement_vertex";

const initialState = {
  isBuilding: false,
  selectedVertex: null
};

const buildSettlementReducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_BUILDING_SETTLEMENT:
      return { isBuilding: true, selectedVertex: null };
    case END_BUILDING_SETTLEMENT:
      return { isBuilding: false, selectedVertex: null };
    case CHOOSE_SETTLEMENT_VERTEX:
      return { isBuilding: true, selectedVertex: action.payload };
    case BUILD_SETTLEMENT:
      return { isBuilding: false, selectedVertex: null };
    default:
      return state;
  }
};

const beginBuildingSettlement = (_, dispatch) => {
  dispatch({
    type: BEGIN_BUILDING_SETTLEMENT
  });
};

const endBuildingSettlement = (_, dispatch) => {
  dispatch({
    type: END_BUILDING_SETTLEMENT
  });
};

const chooseSettlementVertex = (vertex, dispatch) => {
  dispatch({
    type: CHOOSE_SETTLEMENT_VERTEX,
    payload: vertex
  });
};

const buildSettlement = (vertex, dispatch) => {
  const id = 1;

  axios.post(`${apiURL}/games/${id}/player/actions/`, {
    type: "build_settlement",
    payload: vertex
  }).then(resp => {
    dispatch({
      type: BUILD_SETTLEMENT,
      payload: vertex
    });
  }).catch(err => {
    PopupController.pushError({ content: "Hubo un error al construir el templo." });
  });
};

const mapStateToProps = state => ({
  availableVertices: state.game.actions.build_settlement,
  isBuilding: state.game.buildSettlement.isBuilding,
  selectedVertex: state.game.buildSettlement.selectedVertex
});

const mapDispatchToProps = dispatch => ({
  beginBuildingSettlement: _ => beginBuildingSettlement(_, dispatch),
  endBuildingSettlement: _ => endBuildingSettlement(_, dispatch),
  chooseSettlementVertex: vertex => chooseSettlementVertex(vertex, dispatch),
  buildSettlement: vertex => buildSettlement(vertex, dispatch)
});

export { buildSettlementReducer, mapStateToProps, mapDispatchToProps };
