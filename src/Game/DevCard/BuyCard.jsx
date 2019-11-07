import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import apiURL from "../../api";
import PopupController from "../../PopupController/PopupController";
import store from "../../store";

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

  function canBuy() {
    const { grainAmount, oreAmount, woolAmount } = store.getState().resources;
    // Buying a development card requires 1 grain 1 ore and 1 wool
    return grainAmount > 0 && oreAmount > 0 && woolAmount > 0;
  }

  function enoughResources() {
    if (!canBuy()) {
      return "No tienes suficientes recursos";
    }

    return "¿Comprar una carta al azar?";
  }

  return (
    <Popup
      trigger={<button className="button">Comprar carta de desarrollo</button>}
      modal
    >
      {close => (
        <div className="modal">
          <h2 className="header">Comprar carta de desarrollo</h2>
          <div className="actions">
            {enoughResources()}
            <br />
            <button
              onClick={() => {
                if (canBuy()) {
                  buy();
                }
                close();
              }}
              disabled={!canBuy()}
            >
              Confirmar
            </button>
            <button onClick={close}>Cancelar</button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default BuyCard;
