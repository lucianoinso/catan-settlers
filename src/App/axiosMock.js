import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const axiosMock = new MockAdapter(axios, { delayResponse: 150 });

export default axiosMock;
