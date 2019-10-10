import React from "react";

import Board from "./Board/Board";
import Build from "./Build/Build";
import DevCards from "./DevCard/DevCards";
import Resources from "./Resources/Resources";

function Game() {
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

export default Game;
