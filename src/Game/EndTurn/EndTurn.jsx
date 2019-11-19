import React from "react";
import axios from "axios";
import apiURL from "../../api";
import PopupController from "../../PopupController/PopupController";
import { updateGameStatus } from "../Status.ducks";
import store from "../../store.js";

function EndTurn() {
  const id = 1;

  function endTurn() {
    axios
      .post(`${apiURL}/games/${id}/player/actions/`, {
        type: "end_turn",
        payload: ""
      })
      .catch(err => {
        PopupController.pushError({
          content: "Hubo un error al conectarse con el servidor."
        });
        console.error(err);
      })
      .then(response => {
        PopupController.pushLog({ content: "Tu turno ha terminado" });
        updateGameStatus(null, store.dispatch);
      });
  }

  return (
    <button className="end-turn-button" onClick={() => endTurn()}>
      Terminar turno
    </button>
  );
}

export default EndTurn;
