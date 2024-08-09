// assertions

function assert(message, condition) {
  message = message ? `Assertion failed: ${message}` : 'Assertion failed';
  if (!condition) throw new Error(message);
}

function warn(message, condition = true) {
  if(condition) console.warn(`Unimplemented: ${message}`);
}

export { assert, warn };