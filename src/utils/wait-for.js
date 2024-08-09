/**
 * Wait for a variable to be present in the window object.
 */
export function waitFor(value) {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if(value in window) {
        clearInterval(interval);
        resolve(window[value]);
      }
    }, 100);
  });
}