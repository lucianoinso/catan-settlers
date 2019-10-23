import React from "react";
import { mapStateToProps, mapDispatchToProps } from "./Lobbies.ducks";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Lobby from "./Lobby";

class MyLobby extends React.Component {
  componentDidMount() {
    this.props.unloadLobby(); // borramos otro lobby cargado previamente
    this.props.loadLobby(this.props.match.params.id);
  }

  render() {
    if (
      this.props.lobby === null ||
      // Puede ser que el lobby que quedó cargado sea de otra partida,
      // por eso nos aseguramos que coincida con el id en la url.
      Number(this.props.lobby.id) !== Number(this.props.match.params.id)
    )
      return <div className="loading">...</div>;

    const currentLobby = this.props.lobby;

    if (currentLobby.game_has_started === true)
      return <Redirect to={`/games/${currentLobby.id}`} />;

    return (
      <ul className="lobbies-list my-lobby fade-in">
        <li>
          <Lobby
            name={currentLobby.name}
            owner={currentLobby.owner}
            players={currentLobby.players}
            max_players={currentLobby.max_players}
          />
          {currentLobby.players.length < 3 ? (
            <span className="tooltip">
              Se necesitan al menos 3 jugadores para empezar la partida.
            </span>
          ) : (
            <button
              onClick={() => this.props.startGame(currentLobby.id)}
              disabled={this.props.user !== this.props.lobby.owner}
            >
              Empezar partida
            </button>
          )}
          <br />
          <Link to="/rooms">Salir de la recámara</Link>
        </li>
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLobby);

export { MyLobby as UnconnectedMyLobby };
