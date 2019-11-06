import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "./CreateLobby.ducks";
import Popup from "reactjs-popup";

// Los estilos para el modal quedaron en TradeBank.css!
import "../../Game/TradeBank/TradeBank.css";
import "./CreateLobby.css";

class CreateLobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: "Nombre de la recámara", id: 0 };
  }

  render() {
    return (
      <Popup trigger={<button>Crear recámara del horror</button>} modal>
        {close => (
          <div className="modal">
            <div className="header">
              <h2>Crear recámara del horror</h2>
            </div>
            <form className="actions">
              <div>
                <label htmlFor="lobby-name">Nombre de la recámara:</label>
              </div>
              <input
                id="lobby-name"
                type="text"
                value={this.state.name}
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
              />
              <div>
                <label htmlFor="lobby-id">
                  Número de tablero:{" "}
                  <span
                    className="tooltip"
                    title="Un número entre 0 y 10 indicando qué tablero tendrá la recámara."
                  >
                    (?)
                  </span>
                </label>
              </div>
              <input
                id="lobby-id"
                type="number"
                min="0"
                max="10"
                value={this.state.id}
                onChange={event => {
                  this.setState({ id: event.target.value });
                }}
              />
              <div>
                <button
                  disabled={
                    !this.state.name || this.state.id < 0 || this.state.id > 10
                  }
                  className="confirm"
                  onClick={event => {
                    event.preventDefault();
                    this.props.createLobby({
                      name: this.state.name,
                      id: this.state.id
                    });
                    this.props.updateLobbies();
                    close();
                  }}
                >
                  Crear recámara del horror
                </button>
                <button className="cancel" onClick={close}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateLobby);

export { CreateLobby };
