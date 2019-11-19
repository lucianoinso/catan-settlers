import React from "react";
import { connect } from "react-redux";
import DevCard from "./DevCard";
import BuyCard from "./BuyCard";
import { mapStateToProps, mapDispatchToProps } from "./DevCards.ducks";
import "./DevCards.css";
import PopupController from "../../PopupController/PopupController";
import { devCardNames } from "../SatanDictionary";

function camelCaseToUnderscore(resourceName) {
  return resourceName.replace(/[A-Z]/g, "_$&").toLowerCase();
}

class DevCards extends React.Component {
  componentDidMount() {
    this.props.updateCards({ id: this.props.id });
    this.interval = setInterval(() => {
      this.props.updateCards({ id: this.props.id });
    }, 3000);

    this.previousState = { ...this.props };
  }

  componentDidUpdate() {
    for (let resource of [
      "knight",
      "roadBuilding",
      "yearOfPlenty",
      "monopoly",
      "victoryPoints"
    ]) {
      let diff =
        this.props[resource + "Amount"] -
        this.previousState[resource + "Amount"];
      if (diff !== 0) {
        PopupController.pushLog({
          content:
            (diff < 0 ? "Perdiste " : "Recibiste ") +
            Math.abs(diff) + " " +
            devCardNames[camelCaseToUnderscore(resource)]
        });
      }
    }

    this.previousState = { ...this.props };
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  render() {
    return (
      <div className="devCards">
        <h4>Conjuros</h4>
        <BuyCard id={this.props.id} />
        <ul>
          <li>
            <DevCard
              cardName="knight"
              amount={this.props.knightAmount}
              description="La llamada de Valefar te deja dar un mal augurio"
            />
          </li>
          <li>
            <DevCard
              cardName="road_building"
              amount={this.props.roadBuildingAmount}
              description="El Conjuro de Malphas te deja construir dos portales"
            />
          </li>
          <li>
            <DevCard
              cardName="year_of_plenty"
              amount={this.props.yearOfPlentyAmount}
            />
          </li>
          <li>
            <DevCard cardName="monopoly" amount={this.props.monopolyAmount} />
          </li>
          <li>
            <DevCard
              cardName="victory_points"
              amount={this.props.victoryPointsAmount}
            />
          </li>
        </ul>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevCards);
