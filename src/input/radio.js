import { assert } from "../utils/assert.js";
import { signal, effect } from "signals";
import { hs } from "../utils/h.js";
import { randomName } from "../utils/random-name.js";

const { input, label: $label, span } = hs("input", "label", "span");

function radioChoice(name, signal, attrs, value, label) {
  const id = `${name}-${label}`;
  const inputEl = input({ type: "radio", value, name, id })();
  inputEl.addEventListener("change", () => {
    if (inputEl.checked) signal.value = inputEl.value;
  });
  effect(() => {
    inputEl.checked = signal.value === inputEl.value;
  });
  return span(attrs)(
    inputEl,
    $label({ for: id })(label)
  );
}

function makeRadio(name, signal, attrs) {
  return (option) => {
    if (typeof option === "string") return radioChoice(name, signal, attrs, option, option);
    if ("label" in option && "value" in option) {
      assert("Radio option must be a string", option.label instanceof String);
      assert("Radio value must be a string", option.value instanceof String);
      return radioChoice(name, signal, attrs, option.value, option.label);
    }
    assert(
      "Radio option must be a string or an object with label and value",
      false
    );
  };
}

function radio(options, attrs = {}) {
  const name = randomName();
  const sig = signal(options[0].value || options[0]);
  const els = options.map(makeRadio(name, sig, attrs));
  return {
    element: els,
    signal: sig,
  };
}

export { radio };