import { combineReducers } from "redux";
import { resourcesReducer } from "./Resources/Resources.ducks";
import { actionsReducer} from "./Actions.ducks";
// import { lobbyReducer } from "./Lobby/Lobby.ducks";

const gameReducer = combineReducers({
    resources: resourcesReducer,
    actions: actionsReducer
});

export { gameReducer };
