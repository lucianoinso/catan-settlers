import React from "react";
import { getVertexCoords, getVertexPosition } from "../Board/Settlement";
import { hexSize } from "../Board/Hex";
import { mapStateToProps, mapDispatchToProps } from "./BuildSettlement.ducks";
import { connect } from "react-redux";
import "./ChoosableVertex.css";

const vertexWidth = 35;
const vertexHeight = 35;

class ChoosableVertex extends React.Component {
  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const canvas = this.refs.canvas;
    if (!canvas || process.env.JEST_WORKER_ID !== undefined) return;

    const ctx = canvas.getContext("2d");
    const center = [vertexWidth / 2, vertexHeight / 2];

    ctx.clearRect(0, 0, vertexWidth, vertexHeight);

    ctx.beginPath();
    ctx.arc(...center, 15, 0, Math.PI * 2);
    ctx.fillStyle = "palegoldenrod";
    ctx.fill();

    if (this.isChosen) {
      ctx.strokeStyle = "#505";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }

  render() {
    const { level, index, selectedVertex } = this.props;

    if (selectedVertex) {
      const chosenLevel = selectedVertex.level;
      const chosenIndex = selectedVertex.index;

      this.isChosen = chosenLevel === level && chosenIndex === index;
    } else {
      this.isChosen = false;
    }

    let [x, y, vertex] = getVertexCoords(level, index);
    let [left, top] = getVertexPosition(x, y, vertex);

    left += hexSize / 2 - vertexWidth / 2;
    top += hexSize / 2 - vertexHeight / 2;

    return (
      <div
        style={{
          position: "absolute",
          left: left + "px",
          top: top + "px"
        }}
        onClick={() => {
          this.props.chooseSettlementVertex({ level, index });
          this.draw();
        }}
        className={`choosable-vertex ${this.isChosen ? "selected" : ""}`}
      >
        <canvas ref="canvas" width={vertexWidth} height={vertexHeight}></canvas>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosableVertex);

export { ChoosableVertex as UnconnectedChoosableVertex };