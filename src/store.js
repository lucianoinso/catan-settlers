import { createStore, applyMiddleware, combineReducers } from "redux";
import { loginReducer } from "./Login/Login.ducks";
import { gameReducer } from "./Game/Game.ducks";
import { lobbiesReducer } from "./Lobby/Lobbies.ducks";
import { resourcesReducer } from "./Game/Resources/Resources.ducks";

const rootReducer = combineReducers({
  login: loginReducer,
  game: gameReducer,
  lobbies: lobbiesReducer,
  resources: resourcesReducer
});

const thunk = store => next => action => {
  if (typeof action === "function") {
    action(store.dispatch, store.getState);
    return;
  }
  next(action);
};

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store;

export default store;
