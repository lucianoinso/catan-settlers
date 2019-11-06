import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { UnconnectedBuildSettlement as BuildSettlement } from "./BuildSettlement";
import { UnconnectedChooseVertex as ChooseVertex } from "./ChooseVertex";
import ChoosableVertex, { UnconnectedChoosableVertex } from "./ChoosableVertex";
import Settlement from "../Board/Settlement";

describe('Build settlement "start building" button', () => {
  it("is disabled if there are no available vertices", () => {
    let buildSettlement = mount(<BuildSettlement availableVertices={[]} />);

    expect(buildSettlement.find("button").prop("disabled")).to.be.true;
  });

  it("starts building on click", () => {
    let spy = jest.fn();
    let buildSettlement = mount(
      <BuildSettlement
        availableVertices={[{}, {}]}
        beginBuildingSettlement={spy}
      />
    );

    buildSettlement.find("button").simulate("click");

    expect(spy.mock.calls).to.have.lengthOf(1);
  });

  it("shows confirm and cancel button when building", () => {
    const buildSettlement = mount(
      <BuildSettlement
        isBuilding={true}
        buildSettlement={jest.fn()}
        endBuildingSettlement={jest.fn()}
        selectedVertex={{ level: 0, index: 0 }}
      />
    );

    expect(buildSettlement.find("button")).to.have.lengthOf(2);
  });

  it("builds settlement on confirm and cancels building on cancel", () => {
    const buildSettlementFunction = jest.fn();
    const endBuildingSettlementFunction = jest.fn();
    const buildSettlement = mount(
      <BuildSettlement
        isBuilding={true}
        buildSettlement={buildSettlementFunction}
        endBuildingSettlement={endBuildingSettlementFunction}
        selectedVertex={{ level: 0, index: 0 }}
      />
    );

    buildSettlement.find("button").forEach(button => button.simulate("click"));

    expect(buildSettlementFunction.mock.calls).to.have.lengthOf(1);
    expect(endBuildingSettlementFunction.mock.calls).to.have.lengthOf(1);
  });
});

describe("Choose vertex", () => {
  it("shows vertices to choose from", () => {
    let emptyChooseVertex = shallow(
      <ChooseVertex isBuilding={true} availableVertices={[]} />
    );

    expect(emptyChooseVertex.find(ChoosableVertex)).to.have.lengthOf(0);

    let fullChooseVertex = shallow(
      <ChooseVertex isBuilding={true} availableVertices={[{}, {}, {}]} />
    );

    expect(fullChooseVertex.find(ChoosableVertex)).to.have.lengthOf(3);
  });

  it("only shows available vertices when we're building", () => {
    let chooseVertex = shallow(
      <ChooseVertex isBuilding={false} availableVertices={[{}, {}, {}]} />
    );

    expect(chooseVertex.find(ChoosableVertex)).to.have.lengthOf(0);
  });
});

describe("choosable vertex", () => {
  it("has selected className when it is the selected vertex", () => {
    const randomLevel = Math.floor(Math.random() * 3);
    const randomIndex = Math.floor(Math.random() * 12);

    let choosableVertex = shallow(
      <UnconnectedChoosableVertex
        level={randomLevel}
        index={randomIndex}
        selectedVertex={{ level: randomLevel, index: randomIndex }}
      />
    );

    expect(choosableVertex.find(".selected")).to.have.lengthOf(1);
  });

  it("doesn't have selected className when it's not the selected vertex", () => {
    const randomLevel = Math.floor(Math.random() * 3);
    const randomIndex = Math.floor(Math.random() * 12);

    let choosableVertex = shallow(
      <UnconnectedChoosableVertex
        level={randomLevel}
        index={randomIndex}
        selectedVertex={{ level: 4, index: 13 }}
      />
    );

    expect(choosableVertex.find(".selected")).to.have.lengthOf(0);
  });
});

describe("Settlement", () => {
  it("renders and shows owner as title", () => {
    const settlement = mount(<Settlement owner="beleth" level={0} index={0} />);

    expect(settlement.find("div").prop("title")).to.equal("beleth");
  });
});
