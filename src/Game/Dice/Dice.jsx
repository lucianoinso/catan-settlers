import React from "react";

function Dice({ first, second }) {
  return (
    <div className={`dice first-${first} second-${second}`}>
      <h4>Dados</h4>
      <ul>
        <li>Primer dado: {first}</li>
        <li>Segundo dado: {second}</li>
      </ul>
    </div>
  );
}

export default Dice;
