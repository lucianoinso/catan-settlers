import React from "react";

class Lobby extends React.Component {
  render() {
    return (
      <ul className="lobby">
        <li className="lobby-name">
          <label>Recámara del horror:</label> <span>{this.props.name}</span>
        </li>
        <li className="lobby-owner">
          <label>Invocador:</label> <span>{this.props.owner}</span>
        </li>
        <li className="lobby-players">
          <label>Cantidad de almas:</label>{" "}
          <span className="cantidad-almas">{this.props.players.length}</span>/
          <span className="max-cantidad-almas">{this.props.max_players}</span>
        </li>
      </ul>
    );
  }
}

export default Lobby;
