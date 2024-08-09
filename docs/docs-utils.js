import { signal, computed } from "signals";
import { hs } from "../src/utils/h.js";

function format(str) {
  // remove the same number of spaces at the beginning of each line
  const lines = str.split("\n").filter((line) => line.trim() !== ""); // remove empty lines
  let spaceLength = 0;
  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === " ") spaceLength = i;
      else break;
    }
  }
  return lines.map((line) => line.slice(spaceLength)).join("\n");
}

class WithCode extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const codeStr = format(this.innerHTML);
    const [summary, pre, code, details] = hs(
      "summary",
      "pre",
      "code",
      "details"
    );
    const codeEl = pre({}, code({}, codeStr)); // TODO: syntax highlighting
    const el = summary({}, "Source");
    this.appendChild(details({}, el, codeEl));
  }
}

customElements.define("with-code", WithCode);
