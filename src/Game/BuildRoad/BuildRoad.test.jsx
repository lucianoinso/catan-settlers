import React from "react";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import store from "../../store";
import { Provider } from "react-redux";

import axiosMock from "../../App/axiosMock";

import BuildRoad from "./BuildRoad";
import { updateAvailableActions } from "../Actions.ducks";
import { waitForSeconds } from "../../../setupTest";
import { selectEdge } from "./BuildRoad.ducks";

describe("Build Road button", () => {
  let buildRoadWrapper;

  beforeAll(async () => {
    buildRoadWrapper = mount(
      <Provider store={store}>
        <BuildRoad />
      </Provider>
    );
    // Actualizamos la lista de acciones para tener los
    // lugares disponibles para construir.
    updateAvailableActions(null, store.dispatch);

    await waitForSeconds(0.3);

    buildRoadWrapper.update();
  });

  it("is enabled if build road is an available action", () => {
    expect(buildRoadWrapper.find("button").prop("disabled")).to.equal(
      !store.getState().game.actions.build_road
    );
  });

  it("allows to start and cancel building road", () => {
    buildRoadWrapper.find("button").simulate("click");
    buildRoadWrapper.update();

    expect(buildRoadWrapper.find("button")).to.have.lengthOf(
      2,
      "there's a Confirm and Cancel button"
    );

    // (!) Esto tiene hardcodeado que el segundo botón sea el de cancelar.
    buildRoadWrapper
      .find("button")
      .at(1)
      .simulate("click");
    buildRoadWrapper.update();

    expect(buildRoadWrapper.find("button")).to.have.lengthOf(
      1,
      "but after cancelling there's only one button"
    );
  });

  it("allows to build road only if there's a selected edge", () => {
    buildRoadWrapper.find("button").simulate("click");
    buildRoadWrapper.update();

    expect(
      buildRoadWrapper
        .find("button")
        .at(0)
        .prop("disabled")
    ).to.be.true;

    selectEdge(
      [{ level: 0, index: 3 }, { level: 0, index: 4 }],
      store.dispatch
    );

    buildRoadWrapper.update();
    expect(
      buildRoadWrapper
        .find("button")
        .at(0)
        .prop("disabled")
    ).to.be.false;
  });

  it("should make an API call and stop building road on confirm", async () => {
    expect(
      buildRoadWrapper
        .find("button")
        .at(0)
        .prop("disabled")
    ).to.be.false;

    // "Iniciamos sesión"
    localStorage.setItem("user", "batman");

    // Confirmamos
    buildRoadWrapper
      .find("button")
      .at(0)
      .simulate("click");

    // Esperamos la respuesta de la API y re-renderizamos.
    await waitForSeconds(0.3);
    buildRoadWrapper.update();

    expect(
      axiosMock.history.post.filter(
        request =>
          request.url.endsWith("/player/actions/") &&
          request.data.includes(`build_road`)
      )
    ).to.not.have.lengthOf(0);
    expect(store.getState().game.buildRoad.isBuildingRoad).to.be.false;
  });
});

import Roads from "./Roads";
import { updateGameStatus } from "../Status.ducks";

describe("Roads", () => {
  let roadsWrapper;
  beforeAll(async () => {
    roadsWrapper = mount(
      <Provider store={store}>
        <Roads />
      </Provider>
    );

    // Actualizamos la lista de roads para poder testearlas.
    updateGameStatus(null, store.dispatch);

    await waitForSeconds(0.3);

    roadsWrapper.update();
  });

  it("should show as much Road elements as the amount of roads", () => {
    expect(roadsWrapper.find(".road")).to.have.lengthOf(
      store.getState().game.status.roads.length
    );
  });
});

import ChoosableEdge from "./ChoosableEdge";

describe("Choosable edges (when building road)", () => {
  let roadsWrapper;

  beforeAll(async () => {
    roadsWrapper = mount(
      <Provider store={store}>
        <Roads />
        <BuildRoad />
      </Provider>
    );

    // Actualizamos la lista de acciones para tener los
    // lugares disponibles para construir.
    updateAvailableActions(null, store.dispatch);

    await waitForSeconds(0.3);

    roadsWrapper.update();
  });

  it("shouldn't show choosable edges unless we're building a road", () => {
    expect(roadsWrapper.find(".choosable-edge")).to.have.lengthOf(0);
  });

  it("should show the correct amount of choosable edges", () => {
    roadsWrapper.find("button").simulate("click");
    roadsWrapper.update();

    expect(roadsWrapper.find(".choosable-edge")).to.have.lengthOf(
      store.getState().game.actions.build_road.length
    );
  });

  it("should change selected edge on click", () => {
    // En el test anterior ya hicimos click en el botón
    // de "Construir portal".
    const choosableEdges = roadsWrapper.find(".choosable-edge");

    const randomChoosableEdge = choosableEdges.at(
      Math.floor(Math.random() * choosableEdges.length)
    );

    randomChoosableEdge.simulate("click");
    roadsWrapper.update();

    expect(roadsWrapper.find(".selected").prop("edge")).to.equal(
      randomChoosableEdge.prop("edge")
    );
  });
});
