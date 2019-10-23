import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import BuyCard from "./BuyCard";

describe("Buy Card Button", () => {
  it("shows a button", () => {
    const button = shallow(<BuyCard />);
    expect(button.find("button")).to.exist;
  });
});
