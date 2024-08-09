// Evaluates a string to a value
// TODO: what about async expressions?

function evaluate(str) {
  // return new Function(str)();
  return window[str];
}

export { evaluate };