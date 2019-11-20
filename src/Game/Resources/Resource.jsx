import React from "react";
import { resourceNames } from "../SatanDictionary.js";

function Resource({ type, amount }) {
  return (
    <div
      className={`resource ${type}`}
      title={resourceNames[type]}
      style={{ width: "80px", textAlign: "center" }}
    >
      <img
        src={`/assets/resources/${resourceNames[type]}.png`}
        alt={resourceNames[type]}
        style={{ width: "35px" }}
      />
      <span className="resource-amount">{amount}</span>
      <div className="resource-name" style={{ fontSize: "1.2em" }}>
        {resourceNames[type]}
      </div>
    </div>
  );
}

export default Resource;
