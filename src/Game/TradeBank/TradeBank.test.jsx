import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { Provider } from "react-redux";
import store from "../../store";
import TradeBank from "./TradeBank";
import { updateResources } from "../Resources/Resources.ducks";
import { updateAvailableActions } from "../Actions.ducks";
import { waitForSeconds } from "../../../setupTest";
import { setGameId } from "../Status.ducks";

describe("Make a trade with The Bank", () => {
  let tradebank;
  it("shows a button", () => {
    setGameId({ id: 1 }, store.dispatch);
    tradebank = mount(
      <Provider store={store}>
        <TradeBank />
      </Provider>
    );
    expect(tradebank.find("button")).to.exist;
  });

  it("should have one button that triggers bank trade action", () => {
    expect(tradebank.find("button")).to.have.lengthOf(1);
  });

  it("it should be enabled if it's an available option", async () => {
    expect(tradebank.find("button").prop("disabled")).to.be.true;
    // enable button
    updateResources({ id: 1 }, store.dispatch);
    updateAvailableActions({ id: 1 }, store.dispatch);
    await waitForSeconds(0.3);
    tradebank.update();
    expect(tradebank.find("button").prop("disabled")).to.be.false;
  });
});
