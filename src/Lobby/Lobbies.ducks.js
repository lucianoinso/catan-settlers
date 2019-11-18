import axiosMock from "../App/axiosMock.js";
import PopupController from "../PopupController/PopupController";
import apiURL from "../api";
import axios from "axios";

// Axios Mock

let mockedLobbies = [
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
    players: ["remus", "cristobal_colon"],
    max_players: 4,
    game_has_started: false
  }
];

// Para poder editarlo desde la consola del navegador
Object.defineProperty(window, "mockedLobbies", {
  get: () => mockedLobbies,
  set: value => (mockedLobbies = value)
});

// Cargar lobbie(s)

// WTF BUG. Era necesario cambiar esa línea para que no quede "cacheada" la referencia a mockedLobbies.
// Nota: antes era `.reply(200, mockedLobbies);`
axiosMock.onGet(`${apiURL}/rooms/`).reply(config => [200, mockedLobbies]);

const getMockedLobby = config => {
  const lobbyNumber = Number(config.url.match(/\/(\d+)\/$/)[1]);
  const lobby = mockedLobbies.find(lobby => lobby.id === lobbyNumber);

  if (lobby) return [200, lobby];

  return [400, {}];
};

for (let i = 0; i < 15; i++) {
  axiosMock.onGet(`${apiURL}/rooms/${i}/`).reply(getMockedLobby);
}

// Empezar partida

const startMockedLobby = config => {
  const lobbyNumber = Number(config.url.match(/\/(\d+)\/$/)[1]);
  const lobby = mockedLobbies.find(lobby => lobby.id === lobbyNumber);

  if (lobby === null) return [400, {}];

  lobby.game_has_started = true;

  return [200, {}];
};

axiosMock.onPatch(`${apiURL}/rooms/1/`).reply(startMockedLobby);
axiosMock.onPatch(`${apiURL}/rooms/2/`).reply(startMockedLobby);
axiosMock.onPatch(`${apiURL}/rooms/3/`).reply(startMockedLobby);

// Unirse a lobby
const joinMockedLobby = config => {
  const lobbyNumber = Number(config.url.match(/\/(\d+)\/$/)[1]);
  const lobby = mockedLobbies.find(lobby => lobby.id === lobbyNumber);
  const user = localStorage.getItem("user");

  if (!user) return [(401, {})];
  if (lobby.players.includes(user)) return [400, {}];

  // Tenemos que cambiar la respuesta del mock.
  lobby.players.push(user);
  // Pero no sirve a menos que redux lo reconozca como un array diferente!
  mockedLobbies = [...mockedLobbies];

  return [200, {}];
};

axiosMock.onPut(`${apiURL}/rooms/1/`).reply(joinMockedLobby);
axiosMock.onPut(`${apiURL}/rooms/2/`).reply(joinMockedLobby);
axiosMock.onPut(`${apiURL}/rooms/3/`).reply(joinMockedLobby);

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
  console.log("updating lobbies");
  axios
    .get(`${apiURL}/rooms/`)
    .then(response => {
      dispatch({
        type: UPDATE_LOBBIES,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error);
      PopupController.pushError({
        content: error.response.data.detail
      });
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
      console.log(error);
      PopupController.pushError({
        content: error.response.data
      });
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
      console.log(error);
      PopupController.pushError({
        content: error.response.data
      });
    });
};

const joinLobby = (id, dispatch) => {
  axios
    .put(`${apiURL}/rooms/${id}/`)
    .then(response => {
      // Nos unimos al lobby.
      PopupController.pushLog({
        content: "Te uniste a la recámara"
      });
      // Recargamos la lista de lobbies.
      updateLobbies(null, dispatch);
    })
    .catch(error => {
      PopupController.pushError({
        content: `Hubo un error al unirse al lobby.`
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
  joinLobby: id => joinLobby(id, dispatch),
  startGame: id => startGame(id, dispatch)
});

export { updateLobbies, mapStateToProps, mapDispatchToProps, lobbiesReducer };
