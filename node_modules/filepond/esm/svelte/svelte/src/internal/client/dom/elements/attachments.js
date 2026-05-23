import { managed as a, destroy_effect as r, branch as i, effect as c } from "../../reactivity/effects.js";
function d(n, t) {
  var f = void 0, e;
  a(() => {
    f !== (f = t()) && (e && (r(e), e = null), f && (e = i(() => {
      c(() => (
        /** @type {(node: Element) => void} */
        f(n)
      ));
    })));
  });
}
export {
  d as attach
};
