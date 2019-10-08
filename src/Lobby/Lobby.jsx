import React from "react";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      owner: props.owner,
      players: props.players,
      max_players: props.max_players
    };
  }

  calc_players() {
    return this.state.players.length + "/" + this.state.max_players;
  }

  render() {
    return (
      <ul>
        <li>
          <div className={`name ${this.state.name}`}>
            {" "}
            Recámara del horror: {this.state.name}{" "}
          </div>
        </li>
        <li>
          <div className={`owner ${this.state.owner}`}>
            {" "}
            Invocador: {this.state.owner}{" "}
          </div>
        </li>
        <li>
          <div> Cantidad de almas: {this.calc_players()}</div>
        </li>
      </ul>
    );
  }
}

export default Lobby;
