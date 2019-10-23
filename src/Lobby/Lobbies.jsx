import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Lobby from "./Lobby";
import { mapStateToProps, mapDispatchToProps } from "./Lobbies.ducks";

class Lobbies extends React.Component {
  componentDidMount() {
    this.props.updateLobbies();
  }

  render() {
    if (this.props.lobbies === null) return <div className="loading">...</div>;

    if (this.props.lobbies.length === 0)
      return (
        <div className="tooltip">No hay ninguna recámara para unirse.</div>
      );

    return (
      <ul className="lobbies-list fade-in">
        {this.props.lobbies.map(lobby => {
          const { id, name, owner, players, max_players } = lobby;
          return (
            <li key={id}>
              <Lobby
                id={id}
                name={name}
                owner={owner}
                players={players}
                max_players={max_players}
              />
              <div>
                <Link to={`/rooms/${id}`}>Unirse a la recámara</Link>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobbies);

// Esto es necesario para hacer unit testing.
// Cuando hacemos unit testing la idea es no conectar el
// componente al estado global.
export { Lobbies as UnconnectedLobbies };
