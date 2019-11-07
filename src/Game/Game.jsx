import React from "react";
import Board from "./Board/Board";
import BuildSettlement from "./BuildSettlement/BuildSettlement";
import Dice from "./Dice/Dice";
import DevCards from "./DevCard/DevCards";
import Resources from "./Resources/Resources";
import TradeBank from "./TradeBank/TradeBank";
import MoveRobber from "./Robber/MoveRobber";
import BuildRoad from "./BuildRoad/BuildRoad";
import IsLoggedIn from "../IsLoggedIn/IsLoggedIn";
import EndTurn from "./EndTurn/EndTurn";

class Game extends React.Component {
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
        <EndTurn />
        <DevCards />
        <Resources />
      </div>
    );
  }
}

export default Game;
