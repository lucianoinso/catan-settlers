import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Robber.ducks";

class ChoosePlayer extends React.Component {
  listAvailablePlayers() {
    var listPlayer = [];
    this.props.availablePlayers.forEach(robberData => {
      if (this.props.selectedHex !== null) {
        if (
          robberData.position.level === this.props.selectedHex.level &&
          robberData.position.index === this.props.selectedHex.index
        ) {
          listPlayer = robberData.players;
        }
      }
    });
    return listPlayer;
  }

  render() {
    const listPlayer = this.listAvailablePlayers();
    this.props.updateGameStatus();

    if (this.props.availablePlayers !== null) {
      return listPlayer.map(Player => (
        <button
          key={`(${Player})`}
          onClick={() => {
            this.props.chooseRobbedPlayer(Player);
            this.props.moveRobber({
              position: this.props.selectedHex,
              player: Player
            });
            this.props.endMoveRobber();
            this.props.updateGameStatus();
          }}
        >
          {`${Player}`}
        </button>
      ));
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosePlayer);
