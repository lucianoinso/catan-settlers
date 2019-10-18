import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Configuración de Enzyme.
configure({ adapter: new Adapter() });

// Ayudantes para los tests.
const waitForSeconds = n => new Promise(succ => setTimeout(succ, n * 1000));

export { waitForSeconds };
