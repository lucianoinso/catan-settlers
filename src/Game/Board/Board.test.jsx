import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";

import axiosMock from "../../App/axiosMock";
import Board from "./Board";
import { waitForSeconds } from "../../../setupTest";

import { Provider } from "react-redux";
import store from "../../store";

describe("Board", () => {
  let board;

  beforeAll(async () => {
    board = mount(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    await waitForSeconds(0.3);

    // (!) Importante para volver a renderizar con la respuesta de la API.

    board.update();
  });

  it("should have called /games/{id}/board", () => {
    expect(
      axiosMock.history.get.filter(requestInfo =>
        requestInfo.url.match(/\/games\/\d+\/board$/)
      )
    ).to.have.length.greaterThan(0);
  });
  
  it("shows 19 hexagons", () => {
    expect(board.find(".hex")).to.have.lengthOf(19);
  });

  it("has 3 levels of hexagons", () => {
    const hexes = board.find(".hex");

    expect(hexes.find(".level-0")).to.exist;
    expect(hexes.find(".level-1")).to.exist;
    expect(hexes.find(".level-2")).to.exist;
  });
});
