import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../Status.ducks";
import "./Dice.css";
import { getSatanicColor } from "../SatanDictionary";

class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateGameStatus({ id: this.props.id });
  }

  render() {
    if (!this.props.dices || !this.props.allPlayers) return <div />;

    return (
      <div className="dices">
        <div className="column">
          <div className="tooltip">Número maldito:</div>
          <h2>{this.props.dices[0] + this.props.dices[1]}</h2>
        </div>
        <div className="column">
          <div className="tooltip">Invocadores:</div>
          {this.props.allPlayers.map(({ name, color }) => (
            <h2
              className={
                `player-info ` +
                (name === this.props.currentPlayer ? "current" : "")
              }
              style={{ color: getSatanicColor(color) }}
              key={name}
            >
              {name}
            </h2>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dice);
