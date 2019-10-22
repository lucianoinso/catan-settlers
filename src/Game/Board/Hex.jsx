import React from "react";

const hexSize = 125;
const hexWidth = Math.sqrt(3) * (hexSize / 2);

function getHexPosition(x, y) {
  let left = 0;
  let top = 0;
  left = hexWidth * x + (hexWidth / 2) * y;
  top = (3 / 4) * hexSize * y;
  return [left, top];
}

function getHexCoords(level, index) {
  if (level === 0 && index === 0) {
    return [1, 2];
  }
  if (level === 1) {
    if (index === 0) {
      return [2, 1];
    }
    if (index === 1) {
      return [2, 2];
    }
    if (index === 2) {
      return [1, 3];
    }
    if (index === 3) {
      return [0, 3];
    }
    if (index === 4) {
      return [0, 2];
    }
    if (index === 5) {
      return [1, 1];
    }
  } else if (level === 2) {
    if (index === 0) {
      return [2, 0];
    }
    if (index === 1) {
      return [3, 0];
    }
    if (index === 2) {
      return [3, 1];
    }
    if (index === 3) {
      return [3, 2];
    }
    if (index === 4) {
      return [2, 3];
    }
    if (index === 5) {
      return [1, 4];
    }
    if (index === 6) {
      return [0, 4];
    }
    if (index === 7) {
      return [-1, 4];
    }
    if (index === 8) {
      return [-1, 3];
    }
    if (index === 9) {
      return [-1, 2];
    }
    if (index === 10) {
      return [0, 1];
    }
    if (index === 11) {
      return [1, 0];
    }
  }
}

class Hex extends React.Component {
  componentDidMount() {
    // Saltear esto si estamos corriendo tests.
    // Node no tiene el elemento canvas así que no se puede testear este código.
    if (process.env.JEST_WORKER_ID !== undefined) return;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const center = [width / 2, height / 2];
    const radius = width / 2;
    let angle = (Math.PI * 2) / 12;
    while (angle < Math.PI * 2) {
      if (angle === (Math.PI * 2) / 12) {
        ctx.moveTo(
          center[0] + radius * Math.cos(angle),
          center[1] + radius * Math.sin(angle)
        );
      } else {
        ctx.lineTo(
          center[0] + radius * Math.cos(angle),
          center[1] + radius * Math.sin(angle)
        );
      }
      angle = angle + (1 / 6) * (Math.PI * 2);
    }
    let resource = this.props.resource;

    if (resource === "brick") {
      ctx.fillStyle = "black";
    } else if (resource === "wool") {
      ctx.fillStyle = "red";
    } else if (resource === "grain") {
      ctx.fillStyle = "green";
    } else if (resource === "ore") {
      ctx.fillStyle = "yellow";
    } else if (resource === "lumber") {
      ctx.fillStyle = "orange";
    } else if (resource === "desert") {
      ctx.fillStyle = "gray";
    }
    ctx.fill();

    if (resource === "desert") return;

    const token = this.props.token;
    const fontSize = 16 - Math.abs(7 - token);

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.arc(...center, fontSize * 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillText(token, ...center);
  }

  render() {
    const { position, resource } = this.props;
    const { level, index } = position;
    const [x, y] = getHexCoords(level, index);
    const [left, top] = getHexPosition(x, y);
    return (
      <div
        className={`hex level-${level} index-${index} resource-${resource}`}
        style={{
          margin: 0,
          position: "absolute",
          left: left + "px",
          top: top + "px"
        }}
      >
        <canvas ref="canvas" width={hexSize} height={hexSize}></canvas>
      </div>
    );
  }
}

export default Hex;
