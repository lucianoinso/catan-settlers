import React from "react";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "lobby_name",
      owner: "owner",
      players: ["player1", "player2"],
      max_players: 3
    }
  };

function Lobby({id, name, owner, players, max_players}){
    return(
    	<ul>
    	  <li> 
    	    <div className={`id ${id}`}> lobby id: {id} </div>
    	  </li>
    	  <li>
    	    <div className={`name ${name}`}> name: {name} </div>
    	  </li>
    	  <li>
    	    <div className={`owner ${owner}`}> owner: {owner} </div>
    	  </li>
    	  <li>
    	    <div className={`players ${players}`}> players: {players} </div>
    	  </li>
    	  <li>
    	    <div className={`max_players ${max_players}`}> max_players: {max_players} </div>
    	  </li>
        </ul>  
    );
}

export default Lobby;
