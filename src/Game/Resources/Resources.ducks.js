import axios from "axios";
import countResources from "./utils";
import PopupController from "../../PopupController/PopupController.jsx";
import apiURL from "../../api";

// Action types

const SAVE_RESOURCE = "save_resource";

// Reducer

const initialState = {
  brickAmount: 0,
  woolAmount: 0,
  grainAmount: 0,
  lumberAmount: 0,
  oreAmount: 0
};

const resourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_RESOURCE:
      return {
        ...state,
        brickAmount: action.payload.brickAmount,
        woolAmount: action.payload.woolAmount,
        grainAmount: action.payload.grainAmount,
        lumberAmount: action.payload.lumberAmount,
        oreAmount: action.payload.oreAmount
      };
    default:
      return state;
  }
};

// Action creators

const updateResources = (payload, dispatch) => {
  const id = 1;

  axios
    .get(`${apiURL}/games/${id}/player/`)
    .then(response => {
      const countedResources = countResources(response.data.resources);
      payload = countedResources;
      dispatch({
        type: SAVE_RESOURCE,
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

// Maps

const mapStateToProps = state => {
  return {
    brickAmount: state.game.resources.brickAmount,
    woolAmount: state.game.resources.woolAmount,
    grainAmount: state.game.resources.grainAmount,
    lumberAmount: state.game.resources.lumberAmount,
    oreAmount: state.game.resources.oreAmount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateResources: payload => updateResources(payload, dispatch)
  };
};

export {
  resourcesReducer,
  mapStateToProps,
  mapDispatchToProps,
  updateResources
};
