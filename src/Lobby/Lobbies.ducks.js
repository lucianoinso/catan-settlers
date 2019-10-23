import axiosMock from "../App/axiosMock.js";
import PopupController from "../PopupController/PopupController";
import apiURL from "../api";
import axios from "axios";

const mockedLobbies = [
  {
    id: 1,
    name: "Limbo",
    owner: "beleth",
    players: ["mila", "karen", "beleth"],
    max_players: 3,
    game_has_started: false
  },
  {
    id: 2,
    name: "Infierno sangrante",
    owner: "belzebu",
    players: ["matias", "mateo", "belzebu"],
    max_players: 4,
    game_has_started: false
  },
  {
    id: 3,
    name: "Aculturación forzosa",
    owner: "cristobal_colon",
    players: ["remus", "lupin"],
    max_players: 4,
    game_has_started: false
  }
];

axiosMock.onGet(`${apiURL}/rooms/`).reply(200, mockedLobbies);

axiosMock.onGet(`${apiURL}/rooms/1/`).reply(200, mockedLobbies[0]);
axiosMock.onGet(`${apiURL}/rooms/2/`).reply(200, mockedLobbies[1]);
axiosMock.onGet(`${apiURL}/rooms/3/`).reply(200, mockedLobbies[2]);

const startMockedLobby = config => {
  const lobbyNumber = config.url.match(/\/(\d+)\/$/)[1];
  const lobby = mockedLobbies[lobbyNumber - 1];

  if (lobby === null) return [400, {}];

  lobby.game_has_started = true;
  
  return [200, {}];
};

axiosMock.onPatch(`${apiURL}/rooms/1/`).reply(startMockedLobby);
axiosMock.onPatch(`${apiURL}/rooms/2/`).reply(startMockedLobby);
axiosMock.onPatch(`${apiURL}/rooms/3/`).reply(startMockedLobby);

// Action types

const UPDATE_LOBBIES = "update_lobbies";
const LOAD_LOBBY = "load_lobby";

// Reducer

const initialState = {
  list: null,
  selected: null
};

const lobbiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOBBIES:
      return { ...state, list: action.payload };
    case LOAD_LOBBY:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

// Action dispatchers

const updateLobbies = (_, dispatch) => {
  axios
    .get(`${apiURL}/rooms/`)
    .then(response => {
      dispatch({
        type: UPDATE_LOBBIES,
        payload: response.data
      });
    })
    .catch(error => {
      PopupController.pushError({
        content: `Hubo un error al cargar la lista de lobbies.`
      });
      console.log(error);
    });
};

const loadLobby = (id, dispatch) => {
  axios
    .get(`${apiURL}/rooms/${id}/`)
    .then(response => {
      dispatch({
        type: LOAD_LOBBY,
        payload: response.data
      });
    })
    .catch(error => {
      PopupController.pushError({
        content: `Hubo un error al cargar el lobby.`
      });
      console.log(error);
    });
};

const unloadLobby = (_, dispatch) => {
  dispatch({
    type: LOAD_LOBBY,
    payload: null
  });
};

const startGame = (id, dispatch) => {
  axios
    .patch(`${apiURL}/rooms/${id}/`)
    .then(response => {
      // La respuesta fue exitosa, por lo tanto la partida empezó.
      // Recargamos el lobby actual, lo que hace que su propiedad
      // "game_has_started" se actualize.
      loadLobby(id, dispatch);
      // Luego en /rooms/:id redireccionamos automáticamente cuando
      // la propiedad "game_has_started" es `true`.
    })
    .catch(error => {
      PopupController.pushError({
        content: `Hubo un error al iniciar la partida.`
      });
      console.log(error);
    });
};

// Map to props

const mapStateToProps = state => ({
  lobbies: state.lobbies.list,
  lobby: state.lobbies.selected,
  user: state.login.user
});

const mapDispatchToProps = dispatch => ({
  updateLobbies: _ => updateLobbies(_, dispatch),
  loadLobby: lobby => loadLobby(lobby, dispatch),
  unloadLobby: _ => unloadLobby(_, dispatch),
  startGame: id => startGame(id, dispatch)
});

export { updateLobbies, mapStateToProps, mapDispatchToProps, lobbiesReducer };
