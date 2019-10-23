import { createStore, applyMiddleware, combineReducers } from "redux";
import { loginReducer } from "./Login/Login.ducks";
import { gameReducer } from "./Game/Game.ducks";
import { lobbiesReducer } from "./Lobby/Lobbies.ducks";

const rootReducer = combineReducers({
    login: loginReducer,
    game: gameReducer,
    lobbies: lobbiesReducer
});

const thunk = store => next => action => {
    if (typeof action === "function") {
        action(store.dispatch, store.getState);
        return;
    }
    next(action);
};

const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;

export default store;
