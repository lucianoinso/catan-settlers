require('regenerator-runtime/runtime');

const enzyme = require('enzyme');
const adapter = require('enzyme-adapter-react-16');

// Configuración de Enzyme.
enzyme.configure({ adapter: new adapter() });

// Ayudantes para los tests.
const waitForSeconds = n => new Promise(succ => setTimeout(succ, n * 1000));

export { waitForSeconds };
