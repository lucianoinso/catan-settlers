import React from "react";
import { connect } from "react-redux";
import { getHexCoords, getHexPosition, hexSize } from "../Board/Hex";
import { mapStateToProps, mapDispatchToProps } from "./Robber.ducks";

const hexWidth = 35;
const hexHeight = 35;

class ChoosableHex extends React.Component {
  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { canvas } = this.refs;

    if (!canvas || process.env.JEST_WORKER_ID !== undefined) return;

    const ctx = canvas.getContext("2d");
    const center = [hexWidth / 2, hexHeight / 2];

    ctx.clearRect(0, 0, hexWidth, hexHeight);

    ctx.beginPath();
    ctx.arc(...center, 15, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    if (this.isChosen) {
      ctx.strokeStyle = "#450";
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }

  render() {
    const { level, index, selectedHex } = this.props;

    if (selectedHex) {
      const chosenLevel = selectedHex.level;
      const chosenIndex = selectedHex.index;
      this.isChosen = chosenLevel === level && chosenIndex === index;
    } else {
      this.isChosen = false;
    }

    const [x, y] = getHexCoords(level, index);
    let [left, top] = getHexPosition(x, y);

    left += hexSize / 2 - hexWidth / 2;
    top += hexSize / 2 - hexHeight / 2;

    return (
      <div
        style={{
          position: "absolute",
          left: `${left}px`,
          top: `${top}px`
        }}
        onClick={() => {
          this.props.chooseRobberHex({ level, index });
          this.draw();
        }}
        className={`choosable-hex ${this.isChosen ? "selected" : ""}`}
      >
        <canvas ref="canvas" width={hexWidth} height={hexHeight} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosableHex);
