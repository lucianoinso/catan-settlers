import React from "react";

import Board from "./Board/Board";
import Build from "./Build/Build";
import DevCard from "./DevCard/DevCard";

function Game() {
  return (
    <>
      <div>Pagina de una partida </div>
      <Board />
      <Build />
      <DevCard />
    </>
  );
}

export default Game;
