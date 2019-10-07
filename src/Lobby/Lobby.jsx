import React from "react";


class Lobby extends React.Component {
  render() {
    const { id, name, owner, players, max_players } = this.props;
    return (
      <ul>
        <li>
          <div className={`name ${name}`}> Recámara del horror: {name} </div>
        </li>
        <li>
          <div className={`owner ${owner}`}> Invocador: {owner} </div>
        </li>
        <li>
          <div className={`players ${players}`}> Almas atrapadas: {players} </div>
        </li>
        <li>
          <div className={`max_players ${max_players}`}>
            {" "}
            Máxima cantidad de almas: {max_players}{" "}
          </div>
        </li>
      </ul>
    );
  }
}

export default Lobby;
