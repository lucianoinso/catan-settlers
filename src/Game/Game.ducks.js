import { combineReducers } from "redux";
import { resourcesReducer } from "./Resources/Resources.ducks";
import { boardReducer } from "./Board/Board.ducks";
// import { lobbyReducer } from "./Lobby/Lobby.ducks";

const gameReducer = combineReducers({
    resources: resourcesReducer,
    board: boardReducer
    //...
});

export { gameReducer };
