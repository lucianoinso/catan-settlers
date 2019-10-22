import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { resourceNames } from "../SatanDictionary.js";
import { mapStateToPropsBank, mapDispatchToProps } from "../Actions.ducks.js";
import "./TradeBank.css";

class TradeBank extends React.Component {
  constructor(props) {
    super(props);
    this.props.saveAction();
    this.state = {
      offer: "",
      request: ""
    };
  }

  canTrade() {
    if (
      this.props.woolAmount > 3 ||
      this.props.brickAmount > 3 ||
      this.props.oreAmount > 3 ||
      this.props.lumberAmount > 3 ||
      this.props.grainAmount > 3
    ) {
      return true;
    } else {
      return false;
    }
  }

  enoughResources() {
    return this.canTrade()
      ? "Elegir una ofrenda"
      : "No tienes recursos disponibles para ofrecer al Diablo";
  }

  chooseRequest() {
    return this.canTrade() ? "A cambio de un ..." : "";
  }

  setOffer(resource) {
    this.setState({ offer: resource });
  }

  setRequest(resource) {
    this.setState({ request: resource });
  }

  disableRequest(resource) {
    return !this.canTrade() || this.state.offer === resource;
  }

  selectOffer(resource) {
    if (this.state.offer === resource) {
      return "selected";
    }
  }

  selectRequest(resource) {
    if (this.state.request === resource) {
      return "selected";
    }
  }

  render() {
    return (
      <Popup
        trigger={
          <button className="button" disabled={!this.props.bank_trade}>
            {" "}
            Hacer pacto con el Diablo
          </button>
        }
        modal
      >
        {close => (
          <div className="modal">
            <div className="header">
              <h2>Pacto con el Diablo</h2>
            </div>
            <div className="actions">
              {this.enoughResources()}
              <br />
              <button
                className={this.selectOffer("brick")}
                onClick={() => this.setOffer("brick")}
                disabled={this.props.brickAmount < 4}
              >
                {resourceNames["brick"]} <br />
                {this.props.brickAmount}
              </button>
              <button
                className={this.selectOffer("ore")}
                onClick={() => this.setOffer("ore")}
                disabled={this.props.oreAmount < 4}
              >
                {resourceNames["ore"]} <br />
                {this.props.oreAmount}
              </button>
              <button
                className={this.selectOffer("wool")}
                onClick={() => this.setOffer("wool")}
                disabled={this.props.woolAmount < 4}
              >
                {resourceNames["wool"]} <br />
                {this.props.woolAmount}
              </button>
              <button
                className={this.selectOffer("grain")}
                onClick={() => this.setOffer("grain")}
                disabled={this.props.grainAmount < 4}
              >
                {resourceNames["grain"]}
                <br /> {this.props.grainAmount}
              </button>
              <button
                className={this.selectOffer("lumber")}
                onClick={() => this.setOffer("lumber")}
                disabled={this.props.lumberAmount < 4}
              >
                {resourceNames["lumber"]}
                <br /> {this.props.lumberAmount}
              </button>
              <br />
              {this.chooseRequest()}
              <br />
              <button
                className={this.selectRequest("brick")}
                onClick={() => this.setRequest("brick")}
                disabled={this.disableRequest("brick")}
              >
                {resourceNames["brick"]}
              </button>
              <button
                className={this.selectRequest("ore")}
                onClick={() => this.setRequest("ore")}
                disabled={this.disableRequest("ore")}
              >
                {resourceNames["ore"]}
              </button>
              <button
                className={this.selectRequest("wool")}
                onClick={() => this.setRequest("wool")}
                disabled={this.disableRequest("wool")}
              >
                {resourceNames["wool"]}
              </button>
              <button
                className={this.selectRequest("grain")}
                onClick={() => this.setRequest("grain")}
                disabled={this.disableRequest("grain")}
              >
                {resourceNames["grain"]}
              </button>
              <button
                className={this.selectRequest("lumber")}
                onClick={() => this.setRequest("lumber")}
                disabled={this.disableRequest("lumber")}
              >
                {resourceNames["lumber"]}
              </button>
              <br />
              <br />
              <button
                className="confirm"
                onClick={() => {
                  this.props.offerBank(this.state.offer);
                  this.props.requestBank(this.state.request);
                  this.setOffer("");
                  this.setRequest("");
                  close();
                }}
                disabled={
                  !this.canTrade() ||
                  !this.state.offer ||
                  !this.state.request ||
                  this.state.offer === this.state.request
                }
              >
                {" "}
                Realizar pacto{" "}
              </button>
              <button
                className="cancel"
                onClick={() => {
                  this.setOffer("");
                  this.setRequest("");
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
