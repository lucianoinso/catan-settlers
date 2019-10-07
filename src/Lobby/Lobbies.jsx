import React from "react";
import axios from "axios";
import axiosMock from "../App/axiosMock.js";
import Lobby from "./Lobby";

class Lobbies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyList: []
    };
  }

  componentDidMount() {
    axiosMock.onGet(`/rooms`).reply(200, [
      {
        id: 1,
        name: "Limbo",
        owner: "beleth",
        players: ["mila", "karen"],
        max_players: 3
      }
    ]);

    axios.get(`/rooms`).then(response => {
      this.setState({
        lobbyList: response.data.map(this.makeComponentFromLobby, this)
      });
    });
    //.catch(error=> { console.log(error);})
  }

  makeComponentFromLobby({ id, name, owner, players, max_players }) {
    return (
      <li>
        <Lobby
          id={id}
          name={name}
          owner={owner}
          players={players}
          max_players={max_players}
        />
      </li>
    );
  }

  render() {
    return <ul className="lobbies">{this.state.lobbyList}</ul>;
  }
}

export default Lobbies;
