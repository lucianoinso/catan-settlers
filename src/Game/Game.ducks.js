import { combineReducers } from "redux";
import { resourcesReducer } from "./Resources/Resources.ducks";
// import { lobbyReducer } from "./Lobby/Lobby.ducks";

const gameReducer = combineReducers({
    resources: resourcesReducer
    //...
});

export { gameReducer };
