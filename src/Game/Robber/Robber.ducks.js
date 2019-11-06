import axios from "axios";
import PopupController from "../../PopupController/PopupController";
import apiURL from "../../api";


const BEGIN_MOVE_ROBBER = "begin_move_robber";
const END_MOVE_ROBBER = "end_move_robber";
const MOVE_ROBBER = "move_robber";
const CHOOSE_ROBBER_PLACE = "choose_robber_place";

const initialState = {
  isMovingRobber: false,
  selectedHex: null,
  playerToRob: null
};

const moveRobberReducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_MOVE_ROBBER:
      return { isMovingRobber: true, selectedHex: null, playerToRob: null };
    case END_MOVE_ROBBER:
      return { isMovingRobber: false, selectedHex: null, playerToRob: null };
    case CHOOSE_ROBBER_PLACE:
      return { isMovingRobber: true, selectedHex: action.payload.hex, playerToRob:null };
    case MOVE_ROBBER:
      return { isMovingRobber: false, selectedHex: null, playerToRob: action.payload.players };
    default:
      return state;
  }
};

const beginMoveRobber = (_, dispatch) => {
  dispatch({
    type: BEGIN_MOVE_ROBBER
  });
};

const endMoveRobber = (_, dispatch) => {
  dispatch({
    type: END_MOVE_ROBBER
  });
};

const chooseRobberPlace = (hex, dispatch) => {
  dispatch({
    type: CHOOSE_ROBBER_PLACE,
    payload: hex
  });
};

const moveRobber = (payload, dispatch) => {
  const id = 1;

  axios.post(`${apiURL}/games/${id}/player/actions`, {
    type: "move_robber",
    payload: payload
  }).then(resp => {
    dispatch({
      type: MOVE_ROBBER,
      payload: payload
    });
  }).catch(err => {
    PopupController.pushError({ content: "Hubo un error al dar el mal augurio." });
  });
};

const mapStateToProps = state => ({
  availableHexes: state.game.actions.move_robber,
  isMovingRobber: state.game.moveRobber.isMovingRobber,
  selectedHex: state.game.moveRobber.selectedHex
});

const mapDispatchToProps = dispatch => ({
  beginMoveRobber: _ => beginMoveRobber(_, dispatch),
  endMoveRobber: _ => endMoveRobber(_, dispatch),
  chooseRobberPlace: hex => chooseRobberPlace(hex, dispatch),
  moveRobber: hex => moveRobber(hex, dispatch)
});

export { moveRobberReducer, mapStateToProps, mapDispatchToProps };
