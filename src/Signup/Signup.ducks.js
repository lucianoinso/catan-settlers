import apiURL from "../api";
import axiosMock from "../App/axiosMock";

const route = `${apiURL}/users/`;
axiosMock.onPost(route).reply(200);

export { route };
