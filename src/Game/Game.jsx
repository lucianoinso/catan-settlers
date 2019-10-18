import React from "react";

import Board from "./Board/Board";
import Build from "./Build/Build";
import DevCards from "./DevCard/DevCards";
import Resources from "./Resources/Resources";
import axiosMock from "../App/axiosMock.js";

class Game extends React.Component {
    componentDidMount() {
        const id = 1;

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
                <DevCards />
                <Resources />
            </div>
        );
    }
}

export default Game;
