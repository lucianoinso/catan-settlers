import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { resourceNames } from "../SatanDictionary.js";
import { mapStateToPropsBank, mapDispatchToProps } from "../Actions.ducks.js";
import "./TradeBank.css";

class TradeBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {offer: ""}
    this.props.saveAction();
  }

  canTrade() {
    if (
      this.props.woolAmount > 3 ||
      this.props.brickAmount > 3 ||
      this.props.oreAmount > 3 ||
      this.props.lumberAmount > 3 ||
      this.props.grain > 3
    ) {
      return true;
    } else {
      return false;
    }
  }

  enoughResources() {
    if (this.canTrade()) {
      return "Elegir un recurso";
    } else {
      return "No tienes recursos disponibles para hacer un pacto";
    }
  }

  render() {
    return (
      <Popup
        trigger={
          <button className="button" disabled={!this.props.bank_trade}>
            {" "}
            Hacer pacto con el Diablo{" "}
          </button>
        }
        modal
      >
        {close => (
          <div className="modal">
            <div className="header"> Pacto con el Diablo </div>
            <div className="actions">
              {this.enoughResources()}
              <button
                className="resourceButton"
                disabled={this.props.brickAmount < 4}
              >
                {resourceNames["brick"]} <br />
                {this.props.brickAmount}
              </button>
              <button
                className="resourceButton"
                disabled={this.props.oreAmount < 4}
              >
                {resourceNames["ore"]} <br />
                {this.props.oreAmount}
              </button>
              <button
                className="resourceButton"
                disabled={this.props.woolAmount < 4}
              >
                {resourceNames["wool"]} <br />
                {this.props.woolAmount}
              </button>
              <button
                className="resourceButton"
                disabled={this.props.grainAmount < 4}
              >
                {resourceNames["grain"]}
                <br /> {this.props.grainAmount}
              </button>
              <button
                className="resourceButton"
                disabled={this.props.lumberAmount < 4}
              >
                {resourceNames["lumber"]}
                <br /> {this.props.lumberAmount}
              </button>
              <br />
              Seleccionar ...
              <button className="resourceButton" disabled={!this.canTrade()}>
                {resourceNames["brick"]}
              </button>
              <button className="resourceButton" disabled={!this.canTrade()}>
                {resourceNames["ore"]}
              </button>
              <button className="resourceButton" disabled={!this.canTrade()}>
                {resourceNames["wool"]}
              </button>
              <button className="resourceButton" disabled={!this.canTrade()}>
                {resourceNames["grain"]}
              </button>
              <button className="resourceButton" disabled={!this.canTrade()}>
                {resourceNames["lumber"]}
              </button>
              <br />
              <Popup
                trigger={
                  <button className="button" disabled={!this.canTrade()}>
                    {" "}
                    Realizar pacto{" "}
                  </button>
                }
                position="top center"
              />

              <button
                className="button"
                onClick={() => {
                  close();
                }}
              >
                Cancelar pacto
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default connect(
  mapStateToPropsBank,
  mapDispatchToProps
)(TradeBank);
