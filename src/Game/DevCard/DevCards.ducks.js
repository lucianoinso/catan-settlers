import axios from "axios";
import PopupController from "../../PopupController/PopupController";
import apiURL from "../../api";
import { updateAvailableActions } from "../Actions.ducks";

// Action types
const BUY_CARD = "buy_card";
const UPDATE_CARDS = "update_cards";

// Reducer
const initialState = {
  knightAmount: 0,
  roadBuildingAmount: 0,
  yearOfPlentyAmount: 0,
  monopolyAmount: 0,
  victoryPointsAmount: 0
};

const devCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CARDS:
    case BUY_CARD:
      return {
        ...state,
        knightAmount: action.payload.knightAmount,
        roadBuildingAmount: action.payload.roadBuildingAmount,
        yearOfPlentyAmount: action.payload.yearOfPlentyAmount,
        monopolyAmount: action.payload.monopolyAmount,
        victoryPointsAmount: action.payload.victoryPointsAmount
      };

    default:
      return state;
  }
};

// Action creators
function countDevCards(devCards) {
  return devCards.reduce(
    (countedDevCards, devCard) => {
      countedDevCards[`${devCard}Amount`]++;
      return countedDevCards;
    },
    {
      knightAmount: 0,
      roadBuildingAmount: 0,
      yearOfPlentyAmount: 0,
      monopolyAmount: 0,
      victoryPointsAmount: 0
    }
  );
}

const updateCards = (payload, dispatch) => {
  if (payload.id === null) return;

  axios
    .get(`${apiURL}/games/${payload.id}/player/`)
    .then(response => {
      const countedDevCards = countDevCards(response.data.cards);
      dispatch({
        type: UPDATE_CARDS,
        payload: countedDevCards
      });
    })
    .catch(err => {
      PopupController.pushError({
        content: `Hubo un error al conectarse con el servidor.`
      });
      console.error(err);
    });
};

const buyCard = (payload, dispatch) => {
  axios
    .post(`${apiURL}/games/${payload.id}/player/actions/`, {
      type: "buy_card",
      payload: ""
    })
    .then(() => {
      updateCards(payload, dispatch);
      updateAvailableActions(payload, dispatch);
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
    id: state.game.status.id,
    knightAmount: state.game.devCards.knightAmount,
    roadBuildingAmount: state.game.devCards.roadBuildingAmount,
    yearOfPlentyAmount: state.game.devCards.yearOfPlentyAmount,
    monopolyAmount: state.game.devCards.monopolyAmount,
    victoryPointsAmount: state.game.devCards.victoryPointsAmount,
    buyCard: state.game.actions.buy_card
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buyCard: payload => buyCard(payload, dispatch),
    updateCards: payload => updateCards(payload, dispatch)
  };
};

export { devCardsReducer, mapStateToProps, mapDispatchToProps, updateCards };
