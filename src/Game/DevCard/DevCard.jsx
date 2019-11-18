import React from "react";
import { devCardNames } from "../SatanDictionary.js";

function DevCard({ cardName, amount, description }) {
  const cardTitle = devCardNames[cardName];
  return (
    <div className={`devcard ${cardName}`} title={description}>
      <img src={`/assets/devcards/${cardName}.png`} alt={cardTitle} />
      <span className="card-title">{cardTitle}</span>
      <span className="card-amount">{amount}</span>
    </div>
  );
}

export default DevCard;
