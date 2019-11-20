import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../Status.ducks";
import { getSatanicColor } from "../SatanDictionary";

class WinGame extends React.Component {
  render() {
    if (this.props.winner) {
      const winnerInfo = this.props.allPlayers.find(
        player => player.name === this.props.winner
      );
      const color = winnerInfo && winnerInfo.color;

      return (
        <div
          style={{
            position: "absolute",
            top: "40%",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
            left: "0"
          }}
        >
          <h2
            className="playerWon"
            style={{
              fontSize: "4em",
              display: "inline-block",
              background: "black",
              border: "1px solid red",
              color: "red",
              padding: "0.1em 0.3em"
            }}
          >
            <span style={{ color: getSatanicColor(color) }}>
              {this.props.winner}
            </span>{" "}
            ha conquistado el infierno
          </h2>
        </div>
      );
    }
    return "";
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WinGame);
