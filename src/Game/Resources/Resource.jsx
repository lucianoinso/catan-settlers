import React from "react";
import { resourceNames } from "../SatanDictionary.js";

function Resource({ type, amount }) {
  return (
    <div className={`resource ${type}`} title={resourceNames[type]}>
      <img
        src={`/assets/resources/${resourceNames[type]}.png`}
        alt={resourceNames[type]}
      />
      <span>
        {resourceNames[type]}: {amount}
      </span>
    </div>
  );
}

export default Resource;
