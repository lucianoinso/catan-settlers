import axios from "axios";
import axiosMock from "../App/axiosMock";
import PopupController from "../PopupController/PopupController.jsx";
import { updateResources } from "./Resources/Resources.ducks";
import apiURL from "../api";
import { edgeEquality } from "./BuildRoad/ChoosableEdge";

const availableVerticesMock = [
  [{ level: 0, index: 2 }, { level: 0, index: 3 }],
  [{ level: 1, index: 4 }, { level: 1, index: 5 }],
  [{ level: 1, index: 5 }, { level: 1, index: 6 }],
  [{ level: 1, index: 6 }, { level: 1, index: 7 }],
  [{ level: 1, index: 7 }, { level: 1, index: 8 }],
  [{ level: 2, index: 7 }, { level: 2, index: 8 }],
  [{ level: 2, index: 10 }, { level: 2, index: 11 }]
];

function filterInPlace(array, predicate) {
  let i = 0;

  while (i < array.length) {
    if (predicate(array[i])) i++;
    else array.splice(i, 1);
  }
}

let availableActionsMock = [
  {
    type: "move_robber",
    payload: [
      { position: { level: 2, index: 1 }, players: ["Batman"] },
      { position: { level: 1, index: 3 }, players: [] }
    ]
  },
  { type: "bank_trade", payload: {} },

  {
    type: "build_road",
    payload: availableVerticesMock
  },
  { type: "buy_card", payload: {} },
  {
    type: "build_settlement",
    payload: [{ level: 0, index: 1 }, { level: 1, index: 5 }]
  },
  {
    type: "play_knight_card",
    payload: [
      { position: { level: 2, index: 1 }, players: [] },
      { position: { level: 1, index: 3 }, players: [] }
    ]
  },
  {
    type: "play_road_building_card",
    payload: availableVerticesMock
  }
];

Object.defineProperty(window, "availableActionsMock", {
  get: () => availableActionsMock,
  set: value => (availableActionsMock = value)
});

const id = 1;
axiosMock
  .onGet(`${apiURL}/games/${id}/player/actions/`)
  .reply(config => [200, availableActionsMock]);

axiosMock.onPost(`${apiURL}/games/${id}/player/actions/`).reply(config => {
  const params = JSON.parse(config.data);
  switch (params.type) {
    case "end_turn":
      console.log(`Terminaste tu turno`);
      // Check si se usa lo siguiente para actualizar el estado del juego
      window.gameStatusMock = { ...window.gameStatusMock };
      return [200, {}];

    case "buy_card":
      console.log("Se compró una carta", params.payload);
      window.resourcesMock.cards = window.resourcesMock.cards.concat(
        "victoryPoints"
      );
      return [200, {}];

    case "build_settlement":
      console.log("Se construyó un templo!!!", params.payload);
      return [200, {}];

    case "move_robber":
      window.gameStatusMock.robber = params.payload.position;
      console.log(`Diste un mal augurio`);
      console.log(`Le diste un mal augurio a ${params.payload.player}`);
      return [200, {}];

    case "bank_trade":
      let resourceCount = 0;
      let index = 0;
      while (resourceCount < 4) {
        while (window.resourcesMock.resources[index] !== params.payload.give) {
          index++;
        }
        resourceCount++;
        window.resourcesMock.resources.splice(index, 1);
        index = 0;
      }
      resourceCount = 0;
      window.resourcesMock.resources = window.resourcesMock.resources.concat(
        params.payload.receive
      );
      return [200, {}];

    case "build_road": {
      if (!localStorage.getItem("user")) return [401, {}];

      // Borramos el vértice de los vértices disponibles.
      filterInPlace(
        availableVerticesMock,
        edge => !edgeEquality(edge, params.payload)
      );
      // Actualizamos para que redux sepa que son arreglos distintos.
      availableActionsMock = [...availableActionsMock];

      // Agregamos la carretera a las carreteras del jugador, si es que se puede
      const playerStatusMock = window.gameStatusMock.players.filter(
        playerStatus => playerStatus.username === localStorage.getItem("user")
      )[0];

      if (!playerStatusMock) return [200, {}];

      playerStatusMock.roads.push(params.payload);
      // Actualizamos para que redux sepa que son objetos distintos.
      window.gameStatusMock = { ...window.gameStatusMock };

      return [200, {}];
    }

    case "play_road_building_card": {
      if (!localStorage.getItem("user")) return [401, {}];

      filterInPlace(availableVerticesMock, edge =>
        params.payload.every(selectedEdge => !edgeEquality(edge, selectedEdge))
      );

      availableActionsMock = [...availableActionsMock];

      const playerStatusMock = window.gameStatusMock.players.find(
        playerStatus => playerStatus.username === localStorage.getItem("user")
      );

      if (!playerStatusMock) return [200, {}];

      playerStatusMock.roads.push(...params.payload);

      window.gameStatusMock = { ...window.gameStatusMock };

      return [200, {}];
    }

    default:
      console.warn(`insert mock of action ${params.type} here.`);
      return [500, {}];
  }
});

// Action types

const SAVE_ACTIONS = "save_actions";

// Reducer

const initialState = {
  build_settlement: false,
  upgrade_city: false,
  build_road: false,
  move_robber: false,
  buy_card: false,
  play_knight_card: false,
  play_road_building_card: false,
  play_monopoly_card: false,
  play_year_of_plenty_card: false,
  end_turn: false,
  bank_trade: false
};

const actionsReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case SAVE_ACTIONS:
      return {
        build_settlement: action.payload.build_settlement,
        upgrade_city: action.payload.upgrade_city,
        build_road: action.payload.build_road,
        move_robber: action.payload.move_robber,
        buy_card: action.payload.buy_card,
        play_knight_card: action.payload.play_knight_card,
        play_road_building_card: action.payload.play_road_building_card,
        play_monopoly_card: action.payload.play_monopoly_card,
        play_year_of_plenty_card: action.payload.play_year_of_plenty_card,
        end_turn: action.payload.end_turn,
        bank_trade: action.payload.bank_trade
      };
    default:
      return state;
  }
};

function possibleActions(actions) {
  return actions.reduce(
    (possibleActions, action) => {
      possibleActions[action.type] = action.payload;
      return possibleActions;
    },
    {
      build_settlement: false,
      upgrade_city: false,
      build_road: false,
      move_robber: false,
      buy_card: false,
      play_knight_card: false,
      play_road_building_card: false,
      play_monopoly_card: false,
      play_year_of_plenty_card: false,
      end_turn: false,
      bank_trade: false
    }
  );
}
// Action creators

const saveAction = (payload, dispatch) => {
  axios
    .get(`${apiURL}/games/${id}/player/actions/`)
    .then(response => {
      const possibleAction = possibleActions(response.data);
      payload = possibleAction;
      dispatch({
        type: SAVE_ACTIONS,
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

const tradeBank = payload => {
  axios
    .post(`${apiURL}/games/${id}/player/actions/`, {
      type: "bank_trade",
      payload
    })
    .catch(err => {
      PopupController.pushError({
        content: `Hubo un error al conectarse con el servidor.`
      });
    });
};

const mapStateToPropsBank = state => {
  return {
    bank_trade: state.game.actions.bank_trade,
    brickAmount: state.game.resources.brickAmount,
    woolAmount: state.game.resources.woolAmount,
    grainAmount: state.game.resources.grainAmount,
    lumberAmount: state.game.resources.lumberAmount,
    oreAmount: state.game.resources.oreAmount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveAction: payload => saveAction(payload, dispatch),
    tradeBank: payload => tradeBank(payload),
    updateResources: payload => updateResources(payload, dispatch)
  };
};

export {
  actionsReducer,
  mapStateToPropsBank,
  mapDispatchToProps,
  saveAction as updateAvailableActions
};
