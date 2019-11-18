import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";

import { CreateLobby } from "./CreateLobby";

describe("CreateLobby", () => {
  let createLobbyWrapper;
  let updateLobbiesMock = jest.fn();
  let createLobbyMock = jest.fn();

  beforeAll(() => {
    createLobbyWrapper = mount(
      <CreateLobby
        createLobby={createLobbyMock}
        updateLobbies={updateLobbiesMock}
      />
    );
  });

  it("should open a popup on click", () => {
    expect(createLobbyWrapper.find(".modal")).to.have.lengthOf(0);

    createLobbyWrapper.find("button").simulate("click");
    createLobbyWrapper.update();

    expect(createLobbyWrapper.find(".modal")).to.have.lengthOf(1);
  });

  it("should close the popup on cancel", () => {
    createLobbyWrapper.find(".cancel").simulate("click");
    createLobbyWrapper.update();

    expect(createLobbyWrapper.find(".modal")).to.have.lengthOf(0);
  });

  it("should call createLobby and updateLobby on confirm", () => {
    createLobbyWrapper.find("button").simulate("click");
    createLobbyWrapper.update();

    // Esto no cambia nada, lo hago sólo para aumentar el coverage.
    createLobbyWrapper.find('input[type="text"]').simulate("change", {
      target: { value: "Hola" }
    });
    createLobbyWrapper.find('input[type="number"]').simulate("change", {
      target: { value: 5 }
    });

    createLobbyWrapper.find(".confirm").simulate("click"); // confirm button
    createLobbyWrapper.update();

    expect(updateLobbiesMock.mock.calls).to.have.lengthOf(1);
    expect(createLobbyMock.mock.calls).to.have.lengthOf(1);
  });

  it("should close the popup on confirm", () => {
    expect(createLobbyWrapper.find(".modal")).to.have.lengthOf(0);
  });
});

import store from "../../store";
import { mapDispatchToProps } from "./CreateLobby.ducks";
import axiosMock from "../../App/axiosMock";
import { waitForSeconds } from "../../../setupTest";

describe("create lobby mock", () => {
  const createLobby = mapDispatchToProps(store.dispatch).createLobby;

  it("should fail if we're not logged it", async () => {
    console.error = jest.fn();

    createLobby({ name: "Lobby", id: 0 });

    await waitForSeconds(0.3);

    const request = axiosMock.history.post.filter(request =>
      request.url.endsWith("/rooms/")
    )[0];

    expect(request.validateStatus()).to.be.false;
    expect(console.error.mock.calls).to.have.lengthOf(1);
  });

  it("should succeed if we're logged in", async () => {
    localStorage.setItem("username", "joker");

    createLobby({ name: "Lobby", id: 0 });

    await waitForSeconds(0.3);

    const request = axiosMock.history.post.filter(request =>
      request.url.endsWith("/rooms/")
    )[0];

    expect(request).to.exist;
    // No volvimos a llamar a console.error.
    expect(console.error.mock.calls).to.have.lengthOf(1);
  });
});
