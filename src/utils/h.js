import { computed, effect, Signal } from "signals";

function t(str) {
  return document.createTextNode(str);
}

/**
 * given a signal<Element>, return an element that updates when the signal changes
 */ 
function unwrap(signal) {
  let el = {replaceWith: () => {}};
  effect(() => {
    const newEl = signal.value;
    el.replaceWith(newEl);
    el = newEl;
  })
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
  if (key[0] === "@") {
    const event = key.slice(1);
    el.addEventListener(event, value);
    return () => el.removeEventListener(event, value);
  }
  el.setAttribute(key, value);
  return null;
}

function makeEl(tag, attrs, children) {
  const el = document.createElement(tag);
  for (const key in attrs) decorate(el, key, attrs[key]);
  children.forEach((child) => {
    el.appendChild(child);
  });
  return el;
}

function h(tag) {
  return (attrs = {}) => (...children) => {
    children = children.flat(Infinity);
    if (!Object.values(attrs).some(value => value instanceof Signal)) {
      return makeEl(tag, attrs, children.map(toEl));
    }
    // create a new element that updates when any of the attributes change
    const el = makeEl(tag, {}, children.map(toEl));
    const disposes = {};
    for(const key in attrs) {
      const v = attrs[key];
      if(v instanceof Signal) {
        effect(() => {
          if(disposes[key]) disposes[key]();
          disposes[key] = decorate(el, key, v.value);
        })
      }
      else decorate(el, key, v);
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
