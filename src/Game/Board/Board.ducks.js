import axios from "axios";
import getMockHexes from "./mockHexes.js";
import axiosMock from "../../App/axiosMock.js";
import PopupController from "../../PopupController/PopupController";
import apiURL from "../../api";

// Mock API

const id = 1; // (!)

axiosMock.onGet(`${apiURL}/games/${id}/board/`).reply(200, {
  hexes: getMockHexes()
});

// Action types

const UPDATE_BOARD = "update_board";

// Reducer

const initialState = [];

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return action.payload.hexes;
    default:
      return state;
  }
};

// Action dispatchers

const updateBoard = (_, dispatch) => {
  axios
    .get(`${apiURL}/games/${id}/board/`)
    .then(response => {
      dispatch({
        type: UPDATE_BOARD,
        payload: { hexes: response.data.hexes }
      });
    })
    .catch(error => {
      PopupController.pushError({
        content: `Hubo un error al conectarse con el servidor.`
      });
      console.error(error);
    });
};

// Map to Props

const mapStateToProps = state => ({
  board: state.game.board,
  settlements: state.game.status.settlements,
  robber: state.game.status.robber
});
const mapDispatchToProps = dispatch => ({
  updateBoard: _ => updateBoard(_, dispatch)
});

export { boardReducer, updateBoard, mapStateToProps, mapDispatchToProps };
