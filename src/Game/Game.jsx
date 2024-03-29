import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Board from "./Board/Board";
import BuildSettlement from "./BuildSettlement/BuildSettlement";
import Dice from "./Dice/Dice";
import DevCards from "./DevCard/DevCards";
import Resources from "./Resources/Resources";
import TradeBank from "./TradeBank/TradeBank";
import MoveRobber from "./Robber/MoveRobber";
import BuildRoad from "./BuildRoad/BuildRoad";
import BuyCard from "./DevCard/BuyCard";
import { mapStateToProps, mapDispatchToProps } from "./Status.ducks";
import EndTurn from "./EndTurn/EndTurn";
import IsLoggedIn from "../IsLoggedIn/IsLoggedIn";
import RoadBuilding from "./RoadBuilding/RoadBuilding";
import WinGame from "./WinGame/WinGame"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasValidId: true };
    const id = Number(this.props.match.params.id);

    if (Number.isNaN(id)) {
      this.setState({ hasValidId: false });
      return;
    }

    this.props.setGameId({ id });
  }

  componentDidMount() {
    this.props.updateGameStatus({ id: this.props.id });
    this.props.updateAvailableActions({ id: this.props.id });
    this.interval = setInterval(() => {
      this.props.updateGameStatus({ id: this.props.id });
      this.props.updateAvailableActions({ id: this.props.id });
    }, 3000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  render() {
    if (!this.state.hasValidId) {
      return <Redirect to="/rooms" />;
    }

    return (
      <div className="game" style={{ padding: "0px 10px", height: "537px" }}>
        <IsLoggedIn />
        <div className="board-and-actions">
          <div
            className="actions-menu"
            style={{
              width: "130px",
              float: "left",
              position: "relative",
              paddingTop: "50px"
            }}
          >
            <TradeBank />
            <BuildSettlement />
            <MoveRobber />
            <BuyCard id={this.props.id} />
            <BuildRoad />
            <RoadBuilding />
            <EndTurn id={this.props.id} />
          </div>
          <Board />
        </div>
        <div
          className="right-panel"
          style={{ float: "left", position: "relative", width: "600px" }}
        >
          <Dice />
          <Resources />
          <div
            className="devcards-all"
            style={{ width: "100%", marginTop: "190px" }}
          >
            <DevCards />
          </div>
        </div>
        <WinGame />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
