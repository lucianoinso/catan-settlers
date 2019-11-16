import React from "react";
import Board from "./Board/Board";
import BuildSettlement from "./BuildSettlement/BuildSettlement";
import Dice from "./Dice/Dice";
import DevCards from "./DevCard/DevCards";
import Resources from "./Resources/Resources";
import TradeBank from "./TradeBank/TradeBank";
import MoveRobber from "./Robber/MoveRobber";
import BuildRoad from "./BuildRoad/BuildRoad";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Status.ducks";
import EndTurn from "./EndTurn/EndTurn";
import IsLoggedIn from "../IsLoggedIn/IsLoggedIn";
import RoadBuilding from "./RoadBuilding/RoadBuilding";

class Game extends React.Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id);

    if (Number.isNaN(id)) return;

    this.props.setGameId({ id });

    this.interval = setInterval(() => {
			console.log(`updating game`);
			this.props.updateGameStatus({ id });
    }, 3000);
  }
  
  componentWillUnmount() {
    if (this.interval)
    clearInterval(this.interval);
  }
  
	render() {
    return (
      <div className="game">
        <IsLoggedIn />
				<Board />
				<Dice />
				<TradeBank />
				<BuildSettlement />
				<MoveRobber />
				<BuildRoad />
        <RoadBuilding />
        <EndTurn />
				<DevCards />
				<Resources />
			</div>
		);
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
