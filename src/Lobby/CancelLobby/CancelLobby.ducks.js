import { mapStateToProps } from "../Lobbies.ducks";
import apiURL from "../../api";
import PopupController from "../../PopupController/PopupController";
import axios from "axios";
import axiosMock from "../../App/axiosMock";

for (let i = 0; i < 15; i++) {
  // es-lint disable-next-line
  axiosMock.onDelete(`${apiURL}/rooms/${i}/`).reply(config => {
    const lobby = window.mockedLobbies.filter(lobby => lobby.id === i)[0];

    if (!lobby) return [400, {}];

    window.mockedLobbies = window.mockedLobbies.filter(lobby => lobby.id !== i);

    return [200, {}];
  });
}

const cancelLobby = (payload, dispatch) => {
  axios
    .delete(`${apiURL}/rooms/${payload.id}/`)
    .then(response => {
      PopupController.pushLog({
        content: `La partida fue cancelada.`
      });
    })
    .catch(error => {
      console.error(error);
      PopupController.pushError({
        content: `Hubo un error al cancelar la partida.`
      });
    });
};

const mapDispatchToProps = dispatch => ({
  cancelLobby: _ => cancelLobby(_, dispatch)
});

export { mapStateToProps, mapDispatchToProps };
