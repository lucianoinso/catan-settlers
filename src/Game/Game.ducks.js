import { combineReducers } from "redux";
import { resourcesReducer } from "./Resources/Resources.ducks";
import { devCardsReducer } from "./DevCard/DevCards.ducks";
import { boardReducer } from "./Board/Board.ducks";
import axiosMock from "../App/axiosMock";
import { actionsReducer } from "./Actions.ducks";
import { statusReducer } from "./Status.ducks";
import apiURL from "../api";
import { buildSettlementReducer } from "./BuildSettlement/BuildSettlement.ducks";

// import { lobbyReducer } from "./Lobby/Lobby.ducks";
const id = 1;

axiosMock.onGet(`${apiURL}/games/${id}`).reply(200, {
  players: [
    {
      username: "joker",
      colour: "#3c5e66",
      settlements: [{ level: 2, index: 5 }, { level: 1, index: 4 }],
      cities: [{ level: 2, index: 1 }, { level: 1, index: 2 }],
      roads: [({ level: 2, index: 1 }, { level: 1, index: 2 })],
      development_cards: 6,
      resources_cards: 9,
      last_gained: ["ore", "brick"]
    },
    {
      username: "batman",
      colour: "#43450d",
      settlements: [{ level: 2, index: 3 }],
      cities: [{ level: 2, index: 1 }, { level: 1, index: 2 }],
      roads: [({ level: 3, index: 2 }, { level: 2, index: 3 })],
      development_cards: 4,
      resources_cards: 2,
      last_gained: ["ore", "ore", "wool"]
    }
  ],
  robber: {
    level: 2,
    index: 3
  },
  current_turn: {
    user: "joker",
    dice: [4, 2]
  },
  winner: ""
});

axiosMock.onGet(`${apiURL}/games/${id}/player`).reply(200, {
  resources: [
    "brick",
    "wool",
    "brick",
    "ore",
    "ore",
    "ore",
    "ore",
    "brick",
    "brick"
  ],
  cards: ["roadBuilding", "monopoly", "victoryPoints", "knight"]
});

const gameReducer = combineReducers({
  resources: resourcesReducer,
  board: boardReducer,
  actions: actionsReducer,
  buildSettlement: buildSettlementReducer,
  status: statusReducer,
  devCards: devCardsReducer
});

export { gameReducer };
