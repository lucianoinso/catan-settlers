import React from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./DevCards.ducks";

class BuyCard extends React.Component {
  render() {
    return (
      <Popup
        trigger={
          <button className="button" disabled={!this.props.buyCard}>
            Comprar conjuro
          </button>
        }
        modal
      >
        {close => (
          <div className="modal">
            <h2 className="header">Comprar conjuro</h2>
            <div className="actions">
              ¿Comprar un conjuro al azar?
              <br />
              <button
                onClick={() => {
                  this.props.buyCard();
                  close();
                }}
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyCard);
