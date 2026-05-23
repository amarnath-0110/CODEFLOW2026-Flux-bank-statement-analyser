import { NAMESPACE_SVG as u } from "../../../../constants.js";
import { EFFECT_TRANSPARENT as c } from "../../constants.js";
import { create_element as p, create_text as _ } from "../operations.js";
import { block as d, teardown as v } from "../../reactivity/effects.js";
import { set_should_intro as t } from "../../render.js";
import { active_effect as g } from "../../runtime.js";
import { assign_nodes as h } from "../template.js";
import { BranchManager as E } from "./branches.js";
function R(a, i, A, n, b, x) {
  var e = null, m = (
    /** @type {TemplateNode} */
    a
  ), o = new E(m, !1);
  d(() => {
    const r = i() || null;
    var l = r === "svg" ? u : void 0;
    if (r === null) {
      o.ensure(null, null), t(!0);
      return;
    }
    return o.ensure(r, (f) => {
      if (r) {
        if (e = p(r, l), h(e, e), n) {
          var s = e.appendChild(_());
          n(e, s);
        }
        g.nodes.end = e, f.before(e);
      }
    }), t(!0), () => {
      r && t(!1);
    };
  }, c), v(() => {
    t(!0);
  });
}
export {
  R as element
};
