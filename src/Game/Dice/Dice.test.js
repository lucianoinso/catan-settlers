import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { expect } from "chai";
import Dice from "./Dice";
import store from "../../store";
import { setGameId } from "../Status.ducks";

describe("Dice", () => {
  it("shows the current dice", () => {
    setGameId({ id: 1 }, store.dispatch);
    const dice = mount(
      <Provider store={store}>
        <Dice />
      </Provider>
    );
    expect(dice.find("dices")).to.exist;
  });
});
