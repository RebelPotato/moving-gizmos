// This file implements the simplified chinese documentation for the site
import { signal, computed } from "signals";
import { hs } from "../src/utils/h.js";
import { radio } from "../src/input/radio.js";

const contents = document.getElementById("contents");
const { fieldset, legend, button, p } = hs("fieldset", "legend", "button", "p");

// radio tests
const selection = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"];
const radioStuff = radio(selection, {class: "lh-copy"});
const radioEl = fieldset()(
  legend()("收音机按钮测试"),
  p()("选中的选项是 ", radioStuff.signal, " 。"),
  p({class: "mw7 flex flex-row justify-around flex-wrap"})(radioStuff.element)
);
contents.appendChild(radioEl);