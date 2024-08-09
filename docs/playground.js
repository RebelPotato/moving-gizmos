import { signal, computed } from "signals";
import { hs } from "../src/utils/h.js";

const contents = document.getElementById("contents");

const toggle = signal(false);
const count = signal(0);
const color = computed(() => (toggle.value ? "green" : "red"));

const { fieldset, legend, button, p } = hs("fieldset", "legend", "button", "p");

const countEl = p({ class: color })("Count: ", count);

const el = fieldset()(
  legend()("Controls"),
  button({ "@click": () => count.value++ })("Increment"),
  button({ "@click": () => count.value-- })("Decrement"),
  button({ "@click": () => (toggle.value = !toggle.value) })("Toggle"),
  countEl
);

contents.appendChild(el);
