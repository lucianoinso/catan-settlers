import React from "react";
import { connect } from "react-redux";
import DevCard from "./DevCard";
import BuyCard from "./BuyCard";
import { mapStateToProps, mapDispatchToProps } from "./DevCards.ducks";

class DevCards extends React.Component {
  componentDidMount() {
    this.props.updateCards();
  }

  render() {
    return (
      <div className="devCards">
        <h4>Cartas de desarrollo</h4>
        <BuyCard />
        <ul>
          <li>
            <DevCard cardName="knight" amount={this.props.knightAmount} />
          </li>
          <li>
            <DevCard
              cardName="roadBuilding"
              amount={this.props.roadBuildingAmount}
            />
          </li>
          <li>
            <DevCard
              cardName="yearOfPlenty"
              amount={this.props.yearOfPlentyAmount}
            />
          </li>
          <li>
            <DevCard cardName="monopoly" amount={this.props.monopolyAmount} />
          </li>
          <li>
            <DevCard
              cardName="victoryPoints"
              amount={this.props.victoryPointsAmount}
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevCards);
