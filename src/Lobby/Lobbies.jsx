import React from "react";
import axios from "axios";
import axiosMock from "../App/axiosMock.js";
import { Link } from "react-router-dom";

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
        players: ["mila", "karen", "beleth"],
        max_players: 3
      },
      {
        id: 2,
        name: "Infierno sangrante",
        owner: "belzebu",
        players: ["matias", "mateo", "belzebu"],
        max_players: 4
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
        <div>
          < Link to="/rooms/1"> Unirse a la recámara </ Link>
        </div>
      </li>
    );
  }

  render() {
    return <ul className="lobbies">{this.state.lobbyList}</ul>;
  }
}

export default Lobbies;
