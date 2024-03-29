import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { Provider } from "react-redux";
import BuyCard from "./BuyCard";
import { updateCards } from "./DevCards.ducks";
import { updateAvailableActions } from "../Actions.ducks";
import { waitForSeconds } from "../../../setupTest";
import store from "../../store";
import { setGameId } from "../Status.ducks";

describe("Buy Card Button", () => {
  it("shows a button", () => {
    setGameId({ id: 1 }, store.dispatch);
    const button = shallow(
      <Provider store={store}>
        <BuyCard />
      </Provider>
    );
    expect(button.find("button")).to.exist;
  });

  it("shows a pop-up", () => {
    setGameId({ id: 1 }, store.dispatch);
    const button = mount(
      <Provider store={store}>
        <BuyCard />
      </Provider>
    );
    const popup = button.find("button").simulate("click");

    expect(popup.find("popup")).to.exist;
    expect(popup.exists()).to.be.true;
  });
  it("should should have 'Confirm' and 'Cancel' buttons", () => {
    setGameId({ id: 1 }, store.dispatch);
    const buycard = mount(
      <Provider store={store}>
        <BuyCard />
      </Provider>
    );
    const popup = buycard.find("button").simulate("click");
    expect(popup.find(".confirm")).to.exist;
    expect(popup.find(".cancel")).to.exist;
  });
  /*
  it("it should be enabled if it's an available option", async () => {
    const buycard = mount(<BuyCard />);
    expect(buycard.find("button").prop("disabled")).to.be.true;
    // enable button
    updateCards({ id: 1 }, store.dispatch);
    updateAvailableActions({ id: 1 }, store.dispatch);

    await waitForSeconds(0.3);
    buycard.update();
    expect(buycard.find("button").prop("disabled")).to.be.false;
  });
*/
});
