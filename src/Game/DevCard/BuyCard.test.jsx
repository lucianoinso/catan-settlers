import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import BuyCard from "./BuyCard";

describe("Buy Card Button", () => {
  it("shows a button", () => {
    const button = shallow(<BuyCard />);
    expect(button.find("button")).to.exist;
  });

  it("shows a poup", () => {
    const button = mount(<BuyCard />);
    const popup = button.find("button").simulate("click");

    expect(popup.find("popup")).to.exist;
    expect(popup.exists()).to.be.true;
  });
});
