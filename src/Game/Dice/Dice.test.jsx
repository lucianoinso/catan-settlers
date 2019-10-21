import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Dice from "./Dice";

describe("Dice", () => {
  it("has two elements", () => {
    const dice = shallow(<Dice first={2} second={5} />);
    expect(dice.find("first-3")).to.exist;
    expect(dice.find("second-5")).to.exist;
  });
});
