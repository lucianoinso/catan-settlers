import axios from "axios";
import PopupController from "../PopupController/PopupController.jsx";
import apiURL from "../api";

// Action types

const SAVE_STATUS = "save_status";

//Reducer

const initialState = {
  currentPlayer: "",
  dices: []
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_STATUS:
      return {
        currentPlayer: action.payload.user,
        dices: action.payload.dice
      };
    default:
      return state;
  }
};

const saveStatus = (payload, dispatch) => {
  const id = 1;
  axios
    .get(`${apiURL}/games/${id}`)
    .then(response => {
      payload = response.data.current_turn;
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

const mapStateToProps = state => {
  return {
    currentPlayer: state.game.status.currentPlayer,
    dices: state.game.status.dices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveStatus: payload => saveStatus(payload, dispatch)
  };
};

export {
  statusReducer,
  mapStateToProps,
  mapDispatchToProps,
};
