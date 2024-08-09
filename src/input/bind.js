// binds the value of an input element to a signal

import { effect, Signal } from 'signals';
import { assert, warn } from "../utils/assert.js";
import { waitFor } from "../utils/wait-for.js";

const notImplemented = () => warn("This input type is not implemented yet");

const accepted = {
  text: bindText,
  checkbox: notImplemented,
  radio: notImplemented,
  range: notImplemented,
};

function bindText(el, signal) {
  effect(() => {
    el.value = signal.value;
  });
  el.addEventListener('input', () => {
    signal.value = el.value;
  });
}

export class BindGizmo extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const inputEl = this.getElementsByTagName('input')[0];
    const type = inputEl.getAttribute('type') || 'text';
    const signal = await waitFor(this.getAttribute("value"));

    assert("A Bind's value must be a signal", signal instanceof Signal);
    assert(`Unsupported input type: ${type}`, type in accepted);
    console.log('binding', type, signal);

    accepted[type](inputEl, signal);
  }
}
