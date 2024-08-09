import { computed, effect, Signal } from "signals";

function t(str) {
  return document.createTextNode(str);
}

/**
 * given a signal<Element>, return an element that updates when the signal changes
 */
function unwrap(signal) {
  let el = { replaceWith: () => {} };
  effect(() => {
    const newEl = signal.value;
    el.replaceWith(newEl);
    el = newEl;
  });
  return el;
}

function toEl(obj) {
  if (obj instanceof Signal) {
    return unwrap(computed(() => toEl(obj.value)));
  }
  if (typeof obj === "string") return t(obj);
  if (obj instanceof Node) return obj;
  return t(obj.toString());
  // throw new Error(`Cannot convert ${obj} to HTMLElement`);
}

function decorate(el, key, value) {
  if (value === undefined || value === null || value === false) return;
  if (key === "style" && typeof value === "object") {
    const memo = {};
    for (const k in value) {
      memo[k] = el.style[k];
      el.style[k] = value[k];
    }
    return () => {
      for (const k in value) el.style[k] = memo[k];
    };
  }
  if (key === "class" && (Array.isArray(value) || typeof value === "string")) {
    if (!Array.isArray(value)) value = value.split(" ");
    value.forEach((v) => el.classList.add(v));
    return () => value.forEach((v) => el.classList.remove(v));
  }
  if (key[0] === "@") {
    const event = key.slice(1);
    el.addEventListener(event, value);
    return () => el.removeEventListener(event, value);
  }
  el.setAttribute(key, value);
  return null;
}

function h(tag) {
  return (attrs = {}) =>
    (...children) => {
      children = children.flat(Infinity);
      const el = document.createElement(tag);
      children.forEach((child) => {
        el.appendChild(toEl(child));
      });
      // create a new element that updates when any of the attributes change
      const disposes = {};
      for (const key in attrs) {
        const v = attrs[key];
        if (v instanceof Signal) {
          effect(() => {
            if (disposes[key]) disposes[key]();
            disposes[key] = decorate(el, key, v.value);
          });
        } else decorate(el, key, v);
      }
      return el;
    };
}

function hs(...tags) {
  const result = {};
  tags.forEach((tag) => {
    result[tag] = h(tag);
  });
  return result;
}

export { h, hs };
