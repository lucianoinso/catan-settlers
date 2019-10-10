import React from "react";
import axios from "axios";
import axiosMock from "../../App/axiosMock.js";
import DevCard from "./DevCard.jsx";

class DevCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      knightAmount: 1,
      roadBuildingAmount: 3,
      yearOfPlentyAmount: 2,
      monopolyAmount: 1,
      victoryPointsAmount: 4,
    };
  }

  render() {
    return (
      <ul>
        <li>
          <DevCard cardName="knight" amount={this.state.knightAmount} />
        </li>
        <li>
          <DevCard cardName="roadBuilding" amount={this.state.roadBuildingAmount} />
        </li>
        <li>
          <DevCard cardName="yearOfPlenty" amount={this.state.yearOfPlentyAmount} />
        </li>
        <li>
          <DevCard cardName="monopoly" amount={this.state.monopolyAmount} />
        </li>
        <li>
          <DevCard cardName="victoryPoints" amount={this.state.victoryPointsAmount} />
        </li>
      </ul>
    );
  }
}

export default DevCards;
