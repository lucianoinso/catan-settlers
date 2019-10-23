import React from "react";
import axios from "axios";
import apiURL from "../../api";
import PopupController from "../../PopupController/PopupController";

function BuyCard() {
  const id = 1;

  function buy() {
    axios
      .post(`${apiURL}/games/${id}/player/actions`, {
        type: "buy_card",
        payload: ""
      })
      .catch(err => {
        PopupController.pushError({
          content: "Hubo un error al conectarse con el servidor."
        });
        console.error(err);
      });
  }

  return (
    <button className="button" onClick={() => buy()}>
      Comprar carta de desarrollo
    </button>
  );
}

export default BuyCard;
