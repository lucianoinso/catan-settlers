import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from "./Lobbies.ducks";
import Lobby from "./Lobby";
import IsLoggedIn from "../IsLoggedIn/IsLoggedIn";
import CancelLobby from "./CancelLobby/CancelLobby";

class MyLobby extends React.Component {
  componentDidMount() {
    this.props.unloadLobby(); // borramos otro lobby cargado previamente
    this.props.loadLobby(this.props.match.params.id);

    this.interval = setInterval(() => {
      this.props.loadLobby(this.props.match.params.id);
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

    let startGameButton = "";

    if (this.props.user !== this.props.lobby.owner)
      startGameButton = (
        <div className="tooltip">
          Sólo el dueño de la recámara puede empezar la conquista.
        </div>
      );
    else if (currentLobby.players.length < 3)
      startGameButton = (
        <div className="tooltip">
          Se necesitan al menos 3 jugadores para empezar la conquista.
        </div>
      );
    else
      startGameButton = (
        <div>
          <button onClick={() => this.props.startGame(currentLobby.id)}>
            Empezar conquista
          </button>
        </div>
      );

    return (
      <div className="lobbies-container margin-left-10 my-lobby fade-in">
        <IsLoggedIn />
        <div className="lobby-list-item">
          <Lobby
            name={currentLobby.name}
            owner={currentLobby.owner}
            players={currentLobby.players}
            max_players={currentLobby.max_players}
          />
          {startGameButton}
          <CancelLobby />
          <Link to="/rooms">Volver</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLobby);

export { MyLobby as UnconnectedMyLobby };
