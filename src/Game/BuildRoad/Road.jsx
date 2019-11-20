import React from "react";
import { getVertexCoords, getVertexPosition } from "../Board/Settlement";
import { hexSize } from "../Board/Hex";
import { getSatanicColor } from "../SatanDictionary";

const margin = 10;

function getRectTopLeftCorner([x0, y0], [x1, y1]) {
  return [Math.min(x0, x1), Math.min(y0, y1)];
}

function getRectDimensions([x0, y0], [x1, y1]) {
  return [Math.abs(x0 - x1), Math.abs(y0 - y1)];
}

function getLineSlope([x0, y0], [x1, y1]) {
  if (Math.abs(x0 - x1) < 0.1) return Infinity;
  return (y1 - y0) / (x1 - x0);
}

class Road extends React.Component {
  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const canvas = this.refs.canvas;
    if (!canvas || process.env.JEST_WORKER_ID !== undefined) return;

    const cx = canvas.getContext("2d");
    const padding = 6 + margin;

    if (this.slope === Infinity || this.slope === -Infinity) {
      cx.moveTo(canvas.width / 2, padding);
      cx.lineTo(canvas.width / 2, canvas.height - padding);
    } else if (this.slope > 0) {
      cx.moveTo(padding, padding);
      cx.lineTo(canvas.width - padding, canvas.height - padding);
    } else {
      cx.moveTo(canvas.width - padding, padding);
      cx.lineTo(padding, canvas.height - padding);
    }

    cx.lineCap = "round";

    if (this.props.selectable) {
      cx.strokeStyle = "black";
      cx.lineWidth = 12;
      cx.stroke();
    }

    cx.strokeStyle = getSatanicColor(this.props.road.color);
    cx.lineWidth = 10;
    cx.stroke();
  }

  render() {
    const { edge, owner } = this.props.road;

    const vertex0Coords = getVertexCoords(edge[0].level, edge[0].index);
    const vertex1Coords = getVertexCoords(edge[1].level, edge[1].index);
    const vertex0Position = getVertexPosition(...vertex0Coords);
    const vertex1Position = getVertexPosition(...vertex1Coords);

    let [left, top] = getRectTopLeftCorner(vertex0Position, vertex1Position);
    let [width, height] = getRectDimensions(vertex0Position, vertex1Position);

    // Necesitamos esto en el componentDidMount
    this.slope = getLineSlope(vertex0Position, vertex1Position);

    left += hexSize / 2 - margin;
    top += hexSize / 2 - margin;

    width += margin * 2;
    height += margin * 2;

    return (
      <div
        className="road"
        style={{
          position: "absolute",
          left: left + "px",
          top: top + "px",
          width: width + "px",
          height: height + "px"
        }}
        title={this.props.selectable ? owner : `Portal de ${owner}`}
      >
        <canvas width={width} height={height} ref="canvas"></canvas>
      </div>
    );
  }
}

export default Road;
