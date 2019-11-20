require("regenerator-runtime/runtime");

const enzyme = require("enzyme");
const adapter = require("enzyme-adapter-react-16");

// Configuración de Enzyme.
enzyme.configure({ adapter: new adapter() });

// Ayudantes para los tests.
const waitForSeconds = n => new Promise(succ => setTimeout(succ, n * 1000));

// Array.prototype.flatMap funciona en Firefox y en Chrome pero no en Node v10.
// Para los tests tenemos que hacer un Polyfill.
// Ver https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#Browser_compatibility

Array.prototype.flatMap = function(mapFunc, context) {
  return this.map(mapFunc, context).reduce(
    (result, element) => [...result, ...element],
    [],
    context
  );
};

export { waitForSeconds };
