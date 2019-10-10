import React from "react";
import axios from "axios";
import axiosMock from "../../App/axiosMock.js";
import DevCard from "./DevCard.jsx";
import PopupController from "../../PopupController/PopupController.jsx";

class DevCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knightAmount: 0,
      roadBuildingAmount: 0,
      yearOfPlentyAmount: 0,
      monopolyAmount: 0,
      victoryPointsAmount: 0
    };
  }

  componentDidMount() {
    const id = 1;

    axios
      .get(`/games/${id}/player`)
      .then(response => {
        const countedDevCards = this.countDevCards(response.data.cards);
        this.setState(countedDevCards);
      })
      .catch(err => {
        PopupController.pushError({
          content: `Hubo un error al conectarse con el servidor.`
        });
        console.error(err);
      });
  }

  countDevCards(devCards) {
    return devCards.reduce(
      (countedDevCards, devCard) => {
        countedDevCards[`${devCard}Amount`]++;
        return countedDevCards;
      },
      {
        knightAmount: 0,
        roadBuildingAmount: 0,
        yearOfPlentyAmount: 0,
        monopolyAmount: 0,
        victoryPointsAmount: 0
      }
    );
  }

  render() {
    return (
      <div className="devCards">
        <h4>Cartas de desarrollo</h4>
        <ul>
          <li>
            <DevCard
              cardName="knight"
              amount={this.state.knightAmount}
            />
          </li>
          <li>
            <DevCard
              cardName="roadBuilding"
              amount={this.state.roadBuildingAmount}
            />
          </li>
          <li>
            <DevCard
              cardName="yearOfPlenty"
              amount={this.state.yearOfPlentyAmount}
            />
          </li>
          <li>
            <DevCard
              cardName="monopoly"
              amount={this.state.monopolyAmount}
            />
          </li>
          <li>
            <DevCard
              cardName="victoryPoints"
              amount={this.state.victoryPointsAmount}
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default DevCards;
