import { EFFECT_TRANSPARENT as l } from "../../constants.js";
import { block as m } from "../../reactivity/effects.js";
import { BranchManager as s } from "./branches.js";
function p(o, e, f = !1) {
  var c = new s(o), t = f ? l : 0;
  function n(r, a) {
    c.ensure(r, a);
  }
  m(() => {
    var r = !1;
    e((a, i = 0) => {
      r = !0, n(i, a);
    }), r || n(-1, null);
  }, t);
}
export {
  p as if_block
};
