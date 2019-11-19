import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { Provider } from "react-redux";
import store from "../../store";
import RoadBuilding from "./RoadBuilding";
import { selectEdge } from "./RoadBuilding.ducks";
import axiosMock from "../../App/axiosMock";
import { updateGameStatus, setGameId } from "../Status.ducks";
import { waitForSeconds } from "../../../setupTest";
import { updateAvailableActions } from "../Actions.ducks";

import { ChoosableEdge2 } from "./ChoosableEdge2";

describe("Use road building card", () => {
  let roadBuilding;

  it("should mount", () => {
    roadBuilding = mount(
      <Provider store={store}>
        <RoadBuilding />
      </Provider>
    );
  });

  it("should have one button that triggers road building card", () => {
    expect(roadBuilding.find("button")).to.have.lengthOf(1);
  });

  it("should enable the button when there're available edges", async () => {
    expect(roadBuilding.find("button").prop("disabled")).to.be.true;

    // Enable button
    updateGameStatus(null, store.dispatch);
    updateAvailableActions(null, store.dispatch);

    await waitForSeconds(0.3);

    roadBuilding.update();

    expect(roadBuilding.find("button").prop("disabled")).to.be.false;

    roadBuilding.find("button").simulate("click");
    roadBuilding.update();

    expect(store.getState().game.roadBuildingCard.isPlayingRoadBuilding).to.be
      .true;
  });

  it("should have 'Confirm' and 'Cancel' buttons when using road building card", () => {
    expect(roadBuilding.find("button")).to.have.lengthOf(2);
  });

  it("should allow canceling road building", () => {
    roadBuilding.find(".cancel").simulate("click");
    roadBuilding.update();
    expect(roadBuilding.find("button")).to.have.lengthOf(1);
  });

  it("shouldn't allow confirmation if there're no selected edges", () => {
    roadBuilding.find("button").simulate("click");
    roadBuilding.update();

    expect(roadBuilding.find(".confirm").prop("disabled")).to.be.true;
  });

  it("should allow confirmation if there are selected edges", () => {
    selectEdge(
      [{ level: 0, index: 0 }, { level: 0, index: 1 }],
      store.dispatch
    );
    selectEdge(
      [{ level: 0, index: 2 }, { level: 0, index: 3 }],
      store.dispatch
    );

    roadBuilding.update();

    expect(roadBuilding.find(".confirm").prop("disabled")).to.be.false;
  });

  it("should send a request on confirmation", async () => {
    localStorage.setItem("user", "joker");
    setGameId({ id: 1 }, store.dispatch);

    roadBuilding.update();

    expect(roadBuilding.find(".confirm").prop("disabled")).to.be.false;
    roadBuilding.find(".confirm").simulate("click");

    await waitForSeconds(0.3);

    const postReq = axiosMock.history.post.find(post =>
      post.url.endsWith("/player/actions/")
    );

    expect(postReq).to.exist;
  });
});

describe("ChoosableEdge2", () => {
  let choosableEdge2;
  const edge = [{ level: 0, index: 0 }, { level: 0, index: 1 }];
  const selectEdge = jest.fn();
  const selectedEdges = [];

  it("should mount", () => {
    choosableEdge2 = mount(
      <ChoosableEdge2
        edge={edge}
        selectEdge={selectEdge}
        selectedEdges={selectedEdges}
      />
    );
  });
});
