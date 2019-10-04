import React from "react";

import Board from "./Board/Board";
import Build from "./Build/Build";
import DevCard from "./DevCard/DevCard";
import Resources from "./Resources/Resources";

function Game() {
  return (
    <>
      <div>Pagina de una partida </div>
      <Board />
      <Build />
      <DevCard />
      <Resources />
    </>
  );
}

export default Game;
