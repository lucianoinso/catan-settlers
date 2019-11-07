import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { expect } from "chai";
import Dice from "./Dice";
import store from "../../store";

describe("Dice", () => {
  it("shows the current dice", () => {
    const dice = mount(
      <Provider store={store}>
        <Dice />
      </Provider>
    );
    expect(dice.find("dices")).to.exist;
  });
});
