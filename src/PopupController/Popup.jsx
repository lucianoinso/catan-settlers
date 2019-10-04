import React from "react";
import PopupController from "./PopupController";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { closed: false };
  }

  close() {
    if (this.state.closed) return;
    this.setState({ closed: true });

    // Esperar 400ms a la animación de cierre
    setTimeout(() => {
      PopupController.removePopup(this.props.id);
    }, 400);
  }

  render() {
    return (
      <div className="popup-container">
        <div
          className={`popup ${this.props.className || ""} ${
            this.state.closed ? "closed" : ""
          }`}
        >
          {this.props.content}{" "}
          <button className="popup-button" onClick={this.close.bind(this)}>
            Cerrar
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
