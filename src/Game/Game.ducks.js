import { combineReducers } from "redux";
import { resourcesReducer } from "./Resources/Resources.ducks";
import { devCardsReducer } from "./DevCard/DevCards.ducks";
import { boardReducer } from "./Board/Board.ducks";
import axiosMock from "../App/axiosMock";
import { actionsReducer } from "./Actions.ducks";
import { statusReducer } from "./Status.ducks";
import apiURL from "../api";
import { buildSettlementReducer } from "./BuildSettlement/BuildSettlement.ducks";
import { moveRobberReducer } from "./Robber/Robber.ducks";
import { buildRoadReducer } from "./BuildRoad/BuildRoad.ducks";
import { roadBuildingCardReducer } from "./RoadBuilding/RoadBuilding.ducks";

const id = 1;

let gameStatusMock = {
  players: [
    {
      username: "joker",
      colour: "#3c5e66",
      settlements: [{ level: 2, index: 5 }, { level: 1, index: 4 }],
      cities: [{ level: 2, index: 1 }, { level: 1, index: 2 }],
      roads: [[{ level: 2, index: 4 }, { level: 1, index: 2 }]],
      development_cards: 6,
      resources_cards: 13,
      last_gained: ["ore", "brick"]
    },
    {
      username: "batman",
      colour: "#43450d",
      settlements: [{ level: 2, index: 3 }, { level: 1, index: 3 }],
      cities: [{ level: 2, index: 1 }, { level: 1, index: 2 }],
      roads: [[{ level: 0, index: 0 }, { level: 0, index: 1 }]],
      development_cards: 4,
      resources_cards: 2,
      last_gained: ["ore", "ore", "wool"]
    },
    {
      username: "Mr Freeze",
      colour: "#43450d",
      settlements: [{ level: 2, index: 3 }, { level: 1, index: 3 }],
      cities: [{ level: 2, index: 1 }, { level: 1, index: 2 }],
      roads: [[{ level: 0, index: 0 }, { level: 0, index: 1 }]],
      development_cards: 4,
      resources_cards: 2,
      last_gained: ["ore", "ore", "wool"]
    },
    {
      username: "The Penguin",
      colour: "#43450d",
      settlements: [{ level: 2, index: 3 }, { level: 1, index: 3 }],
      cities: [{ level: 2, index: 1 }, { level: 1, index: 2 }],
      roads: [[{ level: 0, index: 0 }, { level: 0, index: 1 }]],
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
};

Object.defineProperty(window, "gameStatusMock", {
  get: () => gameStatusMock,
  set: value => (gameStatusMock = value)
});

axiosMock
  .onGet(`${apiURL}/games/${id}/`)
  .reply(config => [200, gameStatusMock]);

var resourcesMock = {
  resources: [
    "brick",
    "wool",
    "brick",
    "ore",
    "ore",
    "ore",
    "ore",
    "brick",
    "lumber",
    "grain",
    "grain",
    "ore",
    "brick"
  ],
  cards: ["roadBuilding", "monopoly", "victoryPoints", "knight"]
};

Object.defineProperty(window, "resourcesMock", {
  get: () => resourcesMock,
  set: value => (resourcesMock = value)
});

axiosMock.onGet(`${apiURL}/games/${id}/player/`).reply(200, resourcesMock);

const gameReducer = combineReducers({
  resources: resourcesReducer,
  board: boardReducer,
  actions: actionsReducer,
  buildSettlement: buildSettlementReducer,
  buildRoad: buildRoadReducer,
  status: statusReducer,
  devCards: devCardsReducer,
  roadBuildingCard: roadBuildingCardReducer,
  moveRobber: moveRobberReducer
});

export { gameReducer, gameStatusMock, resourcesMock };
