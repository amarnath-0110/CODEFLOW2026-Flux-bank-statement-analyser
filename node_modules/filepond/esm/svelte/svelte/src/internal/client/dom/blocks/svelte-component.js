import { EFFECT_TRANSPARENT as a } from "../../constants.js";
import { block as c } from "../../reactivity/effects.js";
import { BranchManager as p } from "./branches.js";
function u(r, n, e) {
  var m = new p(r);
  c(() => {
    var o = n() ?? null;
    m.ensure(o, o && ((t) => e(t, o)));
  }, a);
}
export {
  u as component
};
