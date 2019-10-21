import React from "react";

import Board from "./Board/Board";
import Build from "./Build/Build";
import Dice from "./Dice/Dice";
import DevCards from "./DevCard/DevCards";
import Resources from "./Resources/Resources";
import axiosMock from "../App/axiosMock";

class Game extends React.Component {
  componentDidMount() {
    const id = 1;

    axiosMock.onGet(`/games/{id}`).reply(200, {
      players: [
        {
          username: "joker",
          colour: "green",
          settlements: [{ level: 3, index: 5 }, { level: 1, index: 4 }],
          cities: [{ level: 2, index: 1 }, { level: 1, index: 2 }],
          roads: [({ level: 2, index: 1 }, { level: 1, index: 2 })],
          development_cards: 6,
          resources_cards: 9,
          last_gained: ["ore", "brick"]
        },
        {
          username: "batman",
          colour: "black",
          settlements: [{ level: 1, index: 4 }],
          cities: [{ level: 2, index: 1 }, { level: 1, index: 2 }],
          roads: [({ level: 3, index: 2 }, { level: 2, index: 3 })],
          development_cards: 4,
          resources_cards: 2,
          last_gained: ["ore", "ore", "wool"]
        }
      ],
      robber: {
        level: 2,
        index: 3
      },
      current_turn: {
        user: "joker",
        dice: (4, 2)
      },
      winner: ""
    });

    axiosMock.onGet(`/games/${id}/player`).reply(200, {
      resources: ["brick", "wool", "brick", "ore", "ore"],
      cards: ["roadBuilding", "monopoly", "victoryPoints", "knight"]
    });
  }

  render() {
    return (
      <div className="game">
        <h2>Pagina de una partida</h2>
        <Board />
        <Build />
        <Dice first="1" second="4" />
        <DevCards />
        <Resources />
      </div>
    );
  }
}

export default Game;
