import React from "react";

import Board from "./Board/Board.js";
import Build from "./Build/Build.js";
import DevCard from "./DevCard/DevCard.js";

function Game(){
    return(<>
             <div>Pagina de una partida </div>
             <Board/>
             <Build/>
             <DevCard/>
           </>);
}

export default Game;
