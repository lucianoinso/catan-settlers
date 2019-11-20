import { updateLobbies } from "../Lobbies.ducks";
import axios from "axios";
import apiURL from "../../api";
import PopupController from "../../PopupController/PopupController";
import axiosMock from "../../App/axiosMock";

axiosMock.onPost(`${apiURL}/rooms/`).reply(config => {
  if (!localStorage.getItem("user")) {
    return [401, {}];
  }
  
  const params = JSON.parse(config.data);

  const newLobby = {
    id: window.mockedLobbies.length + 1,
    name: params.name,
    owner: localStorage.getItem("user"),
    players: [localStorage.getItem("user")],
    max_players: 4,
    game_has_started: false
  };

  window.mockedLobbies = [...window.mockedLobbies, newLobby];

  return [200, {}];
});

function createLobby(payload, dispatch) {
  axios
    .post(`${apiURL}/rooms/`, {
      name: payload.name,
      board_id: payload.id
    })
    .then(result => {
      PopupController.pushLog({
        content: `La recámara ha sido creada exitosamente.`
      });
    })
    .catch(error => {
      console.error(error);
      PopupController.pushError({
        content: "Hubo un error al crear la recámara."
      });
    });
}

const mapDispatchToProps = dispatch => ({
  updateLobbies: _ => updateLobbies(_, dispatch),
  createLobby: payload => createLobby(payload, dispatch)
});

export { mapDispatchToProps };
