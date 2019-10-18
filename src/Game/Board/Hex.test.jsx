import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Hex from "./Hex";

describe("Hexagons", () => {
  it("has .level-N and .index-N class attributes", () => {
    const hex = shallow(
      <Hex position={{ index: 1, level: 2 }} resource={"wood"} token={5} />
    );
    expect(hex.find(".level-1")).to.exist;
    expect(hex.find(".index-2")).to.exist;
  });
});
