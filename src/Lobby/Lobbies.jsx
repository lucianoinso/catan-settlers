import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Lobby from "./Lobby";
import { mapStateToProps, mapDispatchToProps } from "./Lobbies.ducks";
import "./Lobbies.css";
import CreateLobby from "./CreateLobby/CreateLobby";
import IsLoggedIn from "../IsLoggedIn/IsLoggedIn";

class Lobbies extends React.Component {
  componentDidMount() {
    this.props.updateLobbies();

    this.updateInterval = setInterval(this.props.updateLobbies, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  tooltipIfEmpty(array, message) {
    if (array.length > 0) return "";
    return <div className="tooltip">{message}</div>;
  }

  render() {
    if (this.props.lobbies === null) return <div className="loading">...</div>;

    const started_lobbies = this.props.lobbies.filter(
      // Las partidas iniciadas que se muestran son aquellas en las que estoy
      lobby =>
        lobby.game_has_started && lobby.players.includes(this.props.username)
    );
    const joined_lobbies = this.props.lobbies.filter(
      lobby =>
        !lobby.game_has_started && lobby.players.includes(this.props.username)
    );
    const unstarted_lobbies = this.props.lobbies.filter(
      lobby =>
        !lobby.game_has_started && !lobby.players.includes(this.props.username)
    );

    // Ordenamos para que los lobbies llenos queden al final
    unstarted_lobbies.sort(function(lobbyA, lobbyB) {
      return lobbyA.players.length - lobbyB.players.length;
    });

    const noStartedLobbiesTooltip = this.tooltipIfEmpty(
      started_lobbies,
      "No estás en ninguna conquista en curso."
    );
    const noJoinedLobbiesTooltip = this.tooltipIfEmpty(
      joined_lobbies,
      "No estás unido a ninguna recámara."
    );
    const noOpenLobbiesTooltip = this.tooltipIfEmpty(
      unstarted_lobbies,
      "No hay ninguna recámara abierta."
    );

    return (
      <div className="lobbies-container">
        <IsLoggedIn />
        <div className="margin-left-10">
          <CreateLobby />
        </div>

        <h2>Conquistas en curso</h2>
        <div className="margin-left-10 fade-in">
          {noStartedLobbiesTooltip}
          {started_lobbies.map(lobby => {
            const { id, name, owner, players, max_players } = lobby;

            return (
              <div className="lobby-list-item" key={id}>
                <Lobby
                  id={id}
                  name={name}
                  owner={owner}
                  players={players}
                  max_players={max_players}
                />
                <div>
                  <Link to={`/games/${id}`}>Ir a la partida</Link>
                </div>
              </div>
            );
          })}
        </div>

        <h2>Recámaras en las que estoy unido</h2>
        <div className="margin-left-10 fade-in">
          {noJoinedLobbiesTooltip}
          {joined_lobbies.map(lobby => {
            const { id, name, owner, players, max_players } = lobby;

            return (
              <div className="lobby-list-item" key={id}>
                <Lobby
                  id={id}
                  name={name}
                  owner={owner}
                  players={players}
                  max_players={max_players}
                />
                <div>
                  <Link to={`/rooms/${id}`}>Ver recámara</Link>
                </div>
              </div>
            );
          })}
        </div>

        <h2>Recámaras abiertas</h2>
        <div className="margin-left-10 fade-in">
          {noOpenLobbiesTooltip}
          {unstarted_lobbies.map(lobby => {
            const { id, name, owner, players, max_players } = lobby;

            let joinLobbyButton;

            if (players.length >= max_players)
              joinLobbyButton = (
                <div>
                  <span className="tooltip">La recámara está llena.</span>
                </div>
              );
            else
              joinLobbyButton = (
                <div>
                  <button onClick={() => this.props.joinLobby(id)}>
                    Unirse a recámara
                  </button>
                </div>
              );

            return (
              <div className="lobby-list-item" key={id}>
                <Lobby
                  id={id}
                  name={name}
                  owner={owner}
                  players={players}
                  max_players={max_players}
                />
                {joinLobbyButton}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobbies);

// Para testear el componente sin conectar a redux.
export { Lobbies as UnconnectedLobbies };
