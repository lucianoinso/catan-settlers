import React from "react";
import { getHexPosition, getHexCoords, hexSize, hexRadius } from "./Hex";
import { getSatanicColor } from "../SatanDictionary";

const settlementWidth = 30;
const settlementHeight = 30;

export function getVertexCoords(level, index) {
  switch (level) {
    case 0:
      return [...getHexCoords(0, 0), index];
    case 1:
      if (index === 0)
        return [...getHexCoords(1, 0), 5];
      const cada3 = Math.floor((index - 1) / 3);
      return [...getHexCoords(1, cada3), index - 1 - cada3 * 2];
    case 2:
      const cada5 = Math.floor(index / 5);
      const mod5  = index % 5;
      if (mod5 <= 1)
        return [...getHexCoords(2, cada5 * 2), index - cada5 * 4];
      else return [...getHexCoords(2, 1 + cada5 * 2), index - (2 + cada5 * 4)];
    default:
      throw console.error("WTF", { level, index });
  }
}

export function getVertexPosition(x, y, vertex) {
  let [left, top] = getHexPosition(x, y);

  const angle = Math.PI * 3/2 + vertex * Math.PI / 3;

  left += hexRadius * Math.cos(angle);
  top  += hexRadius * Math.sin(angle);
  
  return [left, top];
}

class Settlement extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    if (!canvas || process.env.JEST_WORKER_ID !== undefined) return;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = getSatanicColor(this.props.colour);
    ctx.fillRect(0, 0, settlementWidth, settlementHeight);
  }

  render() {
    const { level, index, owner } = this.props;
    let [x, y, vertex] = getVertexCoords(level, index);
    let [left, top] = getVertexPosition(x, y, vertex);

    left += hexSize / 2 - settlementWidth / 2;
    top += hexSize / 2 - settlementHeight / 2;

    return (
      <div
        style={{
          position: "absolute",
          left: left + "px",
          top: top + "px"
        }}
        title={owner}
      >
        <canvas
          ref="canvas"
          width={settlementWidth}
          height={settlementHeight}
        ></canvas>
      </div>
    );
  }
}

export default Settlement;
