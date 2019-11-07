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

    beforeAll(async () => {
        logout = mount(
            <Provider store={store}>
                <Logout />
            </Provider>
        );

        logout.update();

        await waitForSeconds(0.3);
    });

    it("Renders hidden 'not logged' when not logged in", function() {
        const notLogged = "not logged";
        expect(logout.contains(notLogged)).to.equal(true);
    });

    // TODO: false positive, check how to test using redux
    // it("Renders Welcome message when logged in", function() {
    //     const payload = { user: "user1", pass: "12345678" };
    //     logIn(payload, store.dispatch);
    //     const welcome = 'header-welcomx';
    //     console.log(logout.debug());
    //     expect(logout.find(welcome)).to.exist;
    // });
});
