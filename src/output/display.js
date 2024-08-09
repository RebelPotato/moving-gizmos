// displays a value as text
// TODO: add format string
import { effect, Signal } from "signals";
import { assert, warn } from "../utils/assert.js";
import { waitFor } from "../utils/wait-for.js";

class DisplayGizmo extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    const signal = await waitFor(this.getAttribute("value"));
    assert("A Display's value must be a signal", signal instanceof Signal);

    const format = this.getAttribute("format") || ""; // which does nothing for now
    warn("format strings do nothing right now", format !== "");
    const formatted = computed(() => signal.value.toString());

    this.dispose = effect(() => {
      this.textContent = formatted.value;
    });
  }
  disconnectedCallback() {
    this.dispose();
  }
}

export { DisplayGizmo };