import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { UnconnectedLobbies } from "./Lobbies";
import { UnconnectedMyLobby } from "./MyLobby";
import { Redirect, BrowserRouter } from "react-router-dom";

describe("Lobbies", () => {
  it("should attempt to updateLobbies", () => {
    let updateLobbiesWasCalled = false;

    shallow(
      <UnconnectedLobbies
        updateLobbies={() => (updateLobbiesWasCalled = true)}
        current={null}
        lobbies={[]}
      />
    );

    expect(updateLobbiesWasCalled).to.be.true;
  });
});
