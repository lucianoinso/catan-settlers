import React from "react";
import { devCardNames } from "../SatanDictionary.js";

function DevCard({ cardName, amount }) {
  const cardTitle = devCardNames[cardName];
  return (
    <div className={`devcard ${cardName}`} title={cardTitle}>
      <img src={`/assets/devcards/${cardName}.png`} alt={cardTitle} />
      <span className="card-title">{cardTitle}</span>{" "}
      <span className="card-amount">{amount}</span>
    </div>
  );
}

export default DevCard;
