import React from "react";

class Lobby extends React.Component {
  render() {
    const { id, name, owner, players, max_players } = this.props;
    return (
      <ul>
        <li>
          <div className={`id ${id}`}> lobby id: {id} </div>
        </li>
        <li>
          <div className={`name ${name}`}> name: {name} </div>
        </li>
        <li>
          <div className={`owner ${owner}`}> owner: {owner} </div>
        </li>
        <li>
          <div className={`players ${players}`}> players: {players} </div>
        </li>
        <li>
          <div className={`max_players ${max_players}`}>
            {" "}
            max_players: {max_players}{" "}
          </div>
        </li>
      </ul>
    );
  }
}

export default Lobby;
