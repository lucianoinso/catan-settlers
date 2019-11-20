import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import Logout from "./Logout";
import { Provider } from "react-redux";
import { waitForSeconds } from "../../setupTest";
import store from "../store";
import { logIn } from "../Login/Login.ducks";

describe("Logout", function() {
    let logout;

    beforeEach(() => {
        logout = mount(
            <Provider store={store}>
                <Logout />
            </Provider>
        );
    });

    afterEach(() => {
        logout = undefined;
    });

    it("Renders hidden 'not logged' when not logged in", function() {
        const notLogged = "not logged";
        expect(logout.contains(notLogged)).to.equal(true);
    });

    it("Renders Welcome message when logged in", async function() {
        const payload = { user: "user1", pass: "12345678" };
        logIn(payload, store.dispatch);
        await waitForSeconds(0.3);
        logout.update();
        const welcome = "Bienvenid@";
        expect(logout.text()).to.contain(welcome);
    });
});
