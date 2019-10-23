import React from "react";
import Board from "./Board/Board";
import Build from "./Build/Build";
import Dice from "./Dice/Dice";
import DevCards from "./DevCard/DevCards";
import Resources from "./Resources/Resources";
import TradeBank from "./TradeBank/TradeBank";

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<Board />
				<Dice />
				<TradeBank />
				<Build />
				<DevCards />
				<Resources />
			</div>
		);
	}
}

export default Game;
