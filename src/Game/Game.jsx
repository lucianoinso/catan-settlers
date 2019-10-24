import React from "react";
import Board from "./Board/Board";
import BuildSettlement from "./BuildSettlement/BuildSettlement";
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
				<BuildSettlement />
				<DevCards />
				<Resources />
			</div>
		);
	}
}

export default Game;
