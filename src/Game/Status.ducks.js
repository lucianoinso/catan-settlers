import axios from "axios";
import PopupController from "../PopupController/PopupController.jsx";
import apiURL from "../api";

// Action types

const SAVE_STATUS = "save_status";
const SET_GAME_ID = "set_game_id";

// Reducer

const initialState = {
  currentPlayer: "",
  settlements: [],
  roads: [],
  robber: null,
  id: null,
  dices: []
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_STATUS:
      return {
        ...state,
        currentPlayer: action.payload.current_turn.user,
        dices: action.payload.current_turn.dice,
        roads: action.payload.players.flatMap(playerInfo =>
          playerInfo.roads.map(edge => ({
            edge,
            owner: playerInfo.username,
            color: playerInfo.colour
          }))
        ),
        robber: action.payload.robber,
        settlements: action.payload.players.flatMap(playerInfo =>
          playerInfo.settlements.map(settlement => ({
            ...settlement,
            owner: playerInfo.username,
            color: playerInfo.colour
          }))
        )
      };
    case SET_GAME_ID:
      return { ...state, id: action.payload.id };
    default:
      return state;
  }
};

const updateGameStatus = (payload, dispatch) => {
  const id = 1;
  axios
    .get(`${apiURL}/games/${id}`)
    .then(response => {
      payload = response.data;
      dispatch({
        type: SAVE_STATUS,
        payload
      });
    })
    .catch(err => {
      PopupController.pushError({
        content: `Hubo un error al conectarse con el servidor.`
      });
      console.error(err);
    });
};

const setGameId = (payload, dispatch) => {
  dispatch({
    type: SET_GAME_ID,
    payload
  });
};

const mapStateToProps = state => {
  return {
    currentPlayer: state.game.status.currentPlayer,
    id: state.game.status.id,
    dices: state.game.status.dices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGameId: payload => setGameId(payload, dispatch),
    updateGameStatus: payload => updateGameStatus(payload, dispatch)
  };
};

export {
  statusReducer,
  mapStateToProps,
  mapDispatchToProps,
  setGameId,
  updateGameStatus
};
