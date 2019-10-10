import React from "react";
import { devCardNames } from "../SatanDictionary.js";

function DevCard({ cardName, amount }) {
  const cardTitle = devCardNames[cardName];
  return (
    <div className={`devcard ${cardName}`} title={cardTitle}>
      <image src={`/assets/devcards/${cardName}.png`} alt={cardTitle} />
      <span>
        {cardTitle}: {amount}
      </span>
    </div>
  );
}

export default DevCard;
