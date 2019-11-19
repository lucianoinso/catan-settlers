import axios from "axios";
import PopupController from "../../PopupController/PopupController";
import apiURL from "../../api";
import { updateGameStatus } from "../Status.ducks";

const BEGIN_MOVE_ROBBER = "begin_move_robber";
const END_MOVE_ROBBER = "end_move_robber";
const MOVE_ROBBER = "move_robber";
const CHOOSE_ROBBER_PLACE = "choose_robber_place";
const CHOOSE_ROBBED_PLAYER = "choose_robbed_player";
const SAVE_AVAILABLE_PLAYERS = "save_available_players";

const initialState = {
  isMovingRobber: false,
  selectedHex: null,
  playerToRob: null,
  availableRobber: null,
  isPlayingKnight: false
};

const moveRobberReducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_MOVE_ROBBER:
      return {
        ...state,
        isMovingRobber: true,
        selectedHex: null,
        playerToRob: null
      };
    case END_MOVE_ROBBER:
      return {
        ...state,
        isMovingRobber: false,
        selectedHex: null,
        playerToRob: null
      };
    case CHOOSE_ROBBER_PLACE:
      return {
        ...state,
        isMovingRobber: true,
        selectedHex: action.payload,
        playerToRob: null
      };
    case CHOOSE_ROBBED_PLAYER:
      return {
        ...state,
        isMovingRobber: true,
        selectedHex: null,
        playerToRob: action.payload
      };
    case SAVE_AVAILABLE_PLAYERS:
      return {
        ...state,
        availableRobber: action.payload
      };
    case MOVE_ROBBER:
      return {
        ...state,
        isMovingRobber: false,
        selectedHex: action.payload,
        playerToRob: null
      };
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

const chooseRobberHex = (hex, dispatch) => {
  dispatch({
    type: CHOOSE_ROBBER_PLACE,
    payload: hex
  });
};

const chooseRobbedPlayer = (player, dispatch) => {
  dispatch({
    type: CHOOSE_ROBBED_PLAYER,
    payload: player
  });
};

const moveRobber = (payload, dispatch) => {
  const id = 1;
  axios
    .post(`${apiURL}/games/${id}/player/actions/`, {
      type: "move_robber",
      payload
    })
    .catch(err => {
      PopupController.pushError({
        content: "Hubo un error al dar el mal augurio."
      });
    });
};

const mapStateToProps = state => ({
  availableRobber: state.game.actions.move_robber,
  isMovingRobber: state.game.moveRobber.isMovingRobber,
  selectedHex: state.game.moveRobber.selectedHex,
  availableKnight: state.game.actions.play_knight_card
});

const mapDispatchToProps = dispatch => ({
  beginMoveRobber: _ => beginMoveRobber(_, dispatch),
  endMoveRobber: _ => endMoveRobber(_, dispatch),
  chooseRobberHex: hex => chooseRobberHex(hex, dispatch),
  chooseRobbedPlayer: player => chooseRobbedPlayer(player, dispatch),
  moveRobber: hex => moveRobber(hex, dispatch),
  updateGameStatus: payload => updateGameStatus(payload, dispatch)
});

export {
  moveRobberReducer,
  mapStateToProps,
  mapDispatchToProps,
  chooseRobberHex,
  chooseRobbedPlayer
};
