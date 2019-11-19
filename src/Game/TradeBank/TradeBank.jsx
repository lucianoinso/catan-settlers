import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { resourceNames } from "../SatanDictionary.js";
import { mapStateToPropsBank, mapDispatchToProps } from "../Actions.ducks.js";
import "./TradeBank.css";

class TradeBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: "",
      request: ""
    };
  }

  componentDidMount() {
    this.props.saveAction({ id: this.props.id });
  }

  canTrade() {
    return (
      this.props.woolAmount > 3 ||
      this.props.brickAmount > 3 ||
      this.props.oreAmount > 3 ||
      this.props.lumberAmount > 3 ||
      this.props.grainAmount > 3
    );
  }

  enoughResources() {
    return this.canTrade()
      ? "Elegir una ofrenda"
      : "No tienes ofrendas suficientes para el Diablo";
  }

  chooseRequest() {
    return this.canTrade() ? "A cambio de un ..." : "";
  }

  selectPetition(petition, resource) {
    if (
      (petition === "offer" && this.state.offer === resource) ||
      (petition === "request" && this.state.request === resource)
    ) {
      return "selected";
    }
  }

  resourceAmount(resource) {
    if (resource === "brick") {
      return this.props.brickAmount;
    } if (resource === "ore") {
      return this.props.oreAmount;
    } else if (resource === "grain") {
      return this.props.grainAmount;
    } else if (resource === "lumber") {
      return this.props.lumberAmount;
    } else if (resource === "wool") {
      return this.props.woolAmount;
    }
  }

  render() {
    const resourcesList = ["brick", "ore", "wool", "grain", "lumber"];

    return (
      <Popup
        trigger={(
          <button className="button" disabled={!this.props.bank_trade}>
            {" "}
            Hacer pacto con el Diablo
          </button>
        )}
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
              {resourcesList.map(resource => (
                <button
                  key={`(${resource}Offer)`}
                  className={this.selectPetition("offer", resource)}
                  onClick={() => this.setState({ offer: resource })}
                  disabled={this.resourceAmount(resource) < 4}
                >
                  {resourceNames[resource]} 
{' '}
<br />
                  {this.resourceAmount(resource)}
                </button>
              ))}
              <br />
              {this.chooseRequest()}
              <br />
              {resourcesList.map(resource => (
                <button
                  key={`(${resource}Request)`}
                  className={this.selectPetition("request", resource)}
                  onClick={() => this.setState({ request: resource })}
                  disabled={!this.canTrade() || this.state.offer === resource}
                >
                  {resourceNames[resource]}
                </button>
              ))}
              <br />
              <br />
              <button
                className="confirm"
                onClick={() => {
                  this.props.tradeBank({
                    id: this.props.id,
                    give: this.state.offer,
                    receive: this.state.request
                  });
                  this.setState({ offer: "", request: "" });
                  this.props.updateResources({ id: this.props.id });
                  close();
                }}
                disabled={
                  !this.canTrade() ||
                  !this.state.offer ||
                  !this.state.request ||
                  this.state.offer === this.state.request
                }
              >
                 
                Realizar pacto 
              </button>
              <button
                className="cancel"
                onClick={() => {
                  this.setState({ offer: "", request: "" });
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
