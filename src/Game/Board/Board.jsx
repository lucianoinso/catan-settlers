import React from "react";
import { connect } from "react-redux";
import Hex from "./Hex";
import { mapStateToProps, mapDispatchToProps } from "./Board.ducks.js";
import Settlement from "./Settlement";
import Robber from "./Robber";
import ChooseVertex from "../BuildSettlement/ChooseVertex";
import ChooseHex from "../Robber/ChooseHex";
import Roads from "../BuildRoad/Roads";

function makeComponentFromHex({ position, resource, terrain, token }) {
  return (
    <Hex
      key={`(${position.level},${position.index})`}
      position={position}
      resource={resource || terrain}
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

function makeComponentFromRobber(robber) {
  if (robber !== null) {
    return <Robber robber={robber} />;
  }
  return "";
}

function Board({ board, updateBoard, settlements, robber, id }) {
  if (board.length === 0) updateBoard({ id });

  return (
    <div
      style={{
        position: "relative",
        width: "550px",
        height: "500px",
        float: "left",
        margin: "0px 5px"
      }}
      className="board"
    >
      {board.map(makeComponentFromHex)}
      <Roads />
      {settlements.map(makeComponentFromSettlement)}
      {makeComponentFromRobber(robber)}
      <ChooseHex />
      <ChooseVertex />
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
