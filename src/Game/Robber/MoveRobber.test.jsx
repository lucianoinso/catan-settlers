import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { chooseRobberHex, chooseRobbedPlayer } from "./Robber.ducks";
import MoveRobber from "./MoveRobber";
import store from "../../store";
import { updateGameStatus, setGameId } from "../Status.ducks";
import { updateAvailableActions } from "../Actions.ducks";
import { waitForSeconds } from "../../../setupTest";
import ChoosePlayer from "./ChoosePlayer";

describe("Move Robber", () => {
  let moverobber;

  it("should mount", () => {
    setGameId({ id: 1 }, store.dispatch);
    moverobber = mount(
      <Provider store={store}>
        <MoveRobber />
      </Provider>
    );
  });

  it("should have one button that triggers move robber action", () => {
    expect(moverobber.find("button")).to.have.lengthOf(1);
  });

  it("should enable the button when it's an available option", async () => {
    expect(moverobber.find("button").prop("disabled")).to.be.true;
    // enable button
    updateGameStatus({ id: 1 }, store.dispatch);
    updateAvailableActions({ id: 1 }, store.dispatch);
    await waitForSeconds(0.3);
    moverobber.update();
    expect(moverobber.find("button").prop("disabled")).to.be.false;
    moverobber.find("button").simulate("click");
    moverobber.update();
    expect(store.getState().game.moveRobber.isMovingRobber).to.be.true;
  });

  it("should should have 'Confirm' and 'Cancel' buttons when moving the robber", () => {
    expect(moverobber.find("button")).to.have.lengthOf(2);
  });

  it("should allow canceling move robber", () => {
    moverobber.find(".cancel").simulate("click");
    moverobber.update();
    expect(moverobber.find("button")).to.have.lengthOf(1);
  });

  it("shouldn't allow confirmation if there're no selected places", () => {
    moverobber.find("button").simulate("click");
    moverobber.update();

    expect(moverobber.find(".confirm").prop("disabled")).to.be.true;
  });

  it("should allow confirmation if there is a selected hex and player", () => {
    chooseRobberHex({ level: 2, index: 1 }, store.dispatch);
    moverobber.update();

    expect(moverobber.find(".confirm").prop("disabled")).to.be.false;
  });
});
describe("Choose player", () => {
  let chooseplayer;
  it("should mount", () => {
    setGameId({ id: 1 }, store.dispatch);
    chooseplayer = mount(
      <Provider store={store}>
        <ChoosePlayer />
      </Provider>
    );
  });
});
