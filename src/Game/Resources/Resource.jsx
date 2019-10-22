import React from "react";
import { resourceNames } from "../SatanDictionary.js";

function Resource({ type, amount }) {
  return (
    <div className={`resource ${type}`} title={resourceNames[type]}>
      <img src={`/assets/resources/${type}.png`} />
      <span>
        {resourceNames[type]}: {amount}
      </span>
    </div>
  );
}

export default Resource;
