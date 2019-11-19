import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Robber.ducks";
import { checkRobberKnight } from "./ChooseHex";

class ChoosePlayer extends React.Component {
  listavailableRobber() {
    let listPlayer = [];
    const availableThing = checkRobberKnight(
      this.props.availableRobber,
      this.props.availableKnight
    );
    availableThing.forEach(robberData => {
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
    const listPlayer = this.listavailableRobber();
    if (listPlayer.length !== 0) {
      return (
        <div className="actions">
          Elegir alma a la que condenar con un Mal Augurio:
          <br />
          <br />
          {listPlayer.map(Player => (
            <button
              key={`(${Player})`}
              className="confirm"
              onClick={() => {
                this.props.chooseRobbedPlayer(Player);
                this.props.moveRobber({
                  id: this.props.id,
                  position: this.props.selectedHex,
                  player: Player
                });
              }}
            >
              {`${Player}`}
            </button>
          ))}
        </div>
      );
    }
    return (
      <div className="actions">
        Ningun alma sera condenada por un Mal Augurio
        <br />
        <br />
        <button
          onClick={() => {
            this.props.moveRobber({
              id: this.props.id,
              position: this.props.selectedHex
            });
          }}
        >
          Dar Mal Augurio
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosePlayer);
