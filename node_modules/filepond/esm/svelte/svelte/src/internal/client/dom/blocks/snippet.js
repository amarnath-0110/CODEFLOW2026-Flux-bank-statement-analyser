import { EFFECT_TRANSPARENT as i } from "../../constants.js";
import { block as m } from "../../reactivity/effects.js";
import { BranchManager as a } from "./branches.js";
function l(n, o, ...e) {
  var p = new a(n);
  m(() => {
    const r = o() ?? null;
    p.ensure(r, r && ((t) => r(t, ...e)));
  }, i);
}
export {
  l as snippet
};
