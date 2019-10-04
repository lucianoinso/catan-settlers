import React from "react";
import axios from "axios";
import axiosMock from "../../App/axiosMock.js";
import Hex from "./Hex.jsx";
import getMockHexes from "./mockHexes.js";
import PopupController from "../../PopupController/PopupController.jsx";

const id = 1;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hexagonComponents: [] };
  }

  componentDidMount() {
    axiosMock.onGet(`/games/${id}/board`).reply(200, {
      hexes: getMockHexes()
    });

    this.updateBoard();
  }

  async updateBoard() {
    axios
      .get(`/games/${id}/board`)
      .then(response => {
        this.setState({
          hexagonComponents: response.data.hexes.map(
            this.makeComponentFromHex,
            this
          )
        });
      })
      .catch(error => {
        PopupController.pushError({
          content: `Hubo un error al conectarse con el servidor.`
        });
        console.error(error);
      });
  }

  makeComponentFromHex({ position, resource, token }) {
    return (
      <li key={`(${position.level},${position.index})`}>
        <Hex position={position} resource={resource} token={token} />
      </li>
    );
  }

  render() {
    return <ul className="board">{this.state.hexagonComponents}</ul>;
  }
}

export default Board;
