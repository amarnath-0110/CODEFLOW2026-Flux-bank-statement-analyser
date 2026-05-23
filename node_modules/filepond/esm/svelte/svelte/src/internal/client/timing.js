const e = () => performance.now(), o = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (n) => requestAnimationFrame(n)
  ),
  now: () => e(),
  tasks: /* @__PURE__ */ new Set()
};
export {
  o as raf
};
