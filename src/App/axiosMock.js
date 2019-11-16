import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import apiURL from "../api";

const axiosMock = new MockAdapter(
  apiURL === undefined ? axios : axios.create(),
  { delayResponse: 150 }
);

export default axiosMock;
