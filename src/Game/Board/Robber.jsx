import React from "react";
import { getHexPosition, getHexCoords, hexSize, hexRadius } from "./Hex";

const robberWidth = 40;
const robberHeight = 40;

class Robber extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    if (!canvas || process.env.JEST_WORKER_ID !== undefined) return;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, robberWidth, robberHeight);
  }

  render() {
    console.log(this.props.robber);
    const { level, index } = this.props.robber;
    let [x, y] = getHexCoords(level, index);
    let [left, top] = getHexPosition(x, y);

    left += hexSize / 2 - robberWidth / 2;
    top += hexSize / 2 - robberHeight / 2;

    return (
      <div
        style={{
          position: "absolute",
          left: left + "px",
          top: top + "px"
        }}
      >
        <canvas ref="canvas" width={robberWidth} height={robberHeight}></canvas>
      </div>
    );
  }
}

export default Robber;
