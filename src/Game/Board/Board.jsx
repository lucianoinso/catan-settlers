import React from "react";
import Hex from "./Hex.jsx";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./Board.ducks.js";
import Settlement from "./Settlement";
import ChooseVertex from "../BuildSettlement/ChooseVertex";

function makeComponentFromHex({ position, resource, token }) {
  return (
    <Hex
      key={`(${position.level},${position.index})`}
      position={position}
      resource={resource}
      token={token}
    />
  );
}

function makeComponentFromSettlement({ level, index, owner, color: colour }) {
  return (
    <Settlement
      key={`(${level},${index})`}
      level={level}
      index={index}
      owner={owner}
      colour={colour}
    />
  );
}

function Board({ board, updateBoard, settlements }) {
  if (board.length === 0) updateBoard();

  return (
    <div
      style={{
        position: "relative",
        width: "600px",
        height: "600px"
      }}
      className="board"
    >
      {board.map(makeComponentFromHex)}
      {settlements.map(makeComponentFromSettlement)}
      <ChooseVertex />
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
