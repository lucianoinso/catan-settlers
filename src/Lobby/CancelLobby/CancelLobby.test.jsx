import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { CancelLobby } from "./CancelLobby";
import { Link } from "react-router-dom";

describe("cancel lobby", () => {
  let cancelLobby;
  let cancelLobbyMock = jest.fn();

  beforeAll(() => {
    cancelLobby = shallow(
      <CancelLobby
        cancelLobby={cancelLobbyMock}
        username="belzebu"
        lobby={{ owner: "belzebu", id: 0 }}
      />
    );
  });

  it("calls cancel lobby on click", () => {
    expect(cancelLobby.find(Link)).to.have.lengthOf(1);

    cancelLobby.find(Link).simulate("click");

    expect(cancelLobbyMock.mock.calls).to.have.lengthOf(1);
  });

  it("is hidden if username is not the owner", () => {
    cancelLobby.setProps({ username: "batman" });
    expect(cancelLobby.find(Link)).to.have.lengthOf(0);
  });
});

// Testeando el .ducks

import { mapStateToProps, mapDispatchToProps } from "./CancelLobby.ducks";
import store from "../../store";
import axiosMock from "../../App/axiosMock";
import { waitForSeconds } from "../../../setupTest";

describe("cancel lobby ducks", () => {
  const stateProps = mapStateToProps(store.getState());
  const dispatchProps = mapDispatchToProps(store.dispatch);

  it("should call the API", async () => {
    dispatchProps.cancelLobby({ id: 1 });
    await waitForSeconds(0.3);
    expect(axiosMock.history.delete).to.not.have.lengthOf(0);
  });

  it("should not allow to cancel an inexistent lobby", async () => {
    console.error = jest.fn();
    dispatchProps.cancelLobby({ id: 10 });
    await waitForSeconds(0.3);
    expect(console.error.mock.calls).to.have.lengthOf(1);
  });
});
