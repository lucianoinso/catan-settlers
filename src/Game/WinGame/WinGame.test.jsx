import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { Provider } from "react-redux";
import WinGame from "./WinGame";
import { waitForSeconds } from "../../../setupTest";
import store from "../../store";
import { updateGameStatus, setGameId } from "../Status.ducks";

describe("Winner message", () => {
  let wingame;

  beforeEach(() => {
    setGameId({ id: 1 }, store.dispatch);
    wingame = mount(
      <Provider store={store}>
        <WinGame />
      </Provider>
    );
  });

  afterEach(() => {
    wingame = undefined;
  });

  it("Renders nothing when noone won", function() {
    expect(wingame.text()).to.not.contain("conquistado");
  });

  it("Renders the winner when field set", async () => {
    updateGameStatus({ id: 1 }, store.dispatch);
    await waitForSeconds(0.3);
    wingame.update();

    expect(wingame.text()).to.contain("conquistado");
  });
});
