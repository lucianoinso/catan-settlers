import React from "react";
import axios from "axios";
import apiURL from "../../api";
import PopupController from "../../PopupController/PopupController";
import { updateGameStatus } from "../Status.ducks";
import store from "../../store.js";
import { mapStateToPropsBank, updateAvailableActions } from "../Actions.ducks";
import { connect } from "react-redux";

function EndTurn({ id, end_turn }) {
  function endTurn() {
    axios
      .post(`${apiURL}/games/${id}/player/actions/`, {
        type: "end_turn",
        payload: ""
      })
      .then(response => {
        PopupController.pushLog({ content: "Tu turno ha terminado" });
        updateGameStatus({ id }, store.dispatch);
        updateAvailableActions({ id }, store.dispatch);
      })
      .catch(err => {
        PopupController.pushError({
          content: "Hubo un error al conectarse con el servidor."
        });
        console.error(err);
      });
  }

  return (
    <button
      className="end-turn-button"
      onClick={() => endTurn()}
      disabled={!end_turn}
    >
      Terminar turno
    </button>
  );
}

export default connect(mapStateToPropsBank)(EndTurn);
