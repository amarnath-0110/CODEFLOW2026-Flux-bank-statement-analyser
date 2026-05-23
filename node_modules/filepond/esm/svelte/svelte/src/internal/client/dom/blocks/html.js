import { NAMESPACE_SVG as p, NAMESPACE_MATHML as v } from "../../../../constants.js";
import { template_effect as _, remove_effect_dom as M } from "../../reactivity/effects.js";
import { get_first_child as n, create_element as A } from "../operations.js";
import { assign_nodes as d } from "../template.js";
import { active_effect as h } from "../../runtime.js";
function T(l, u, s = !1, t = !1, i = !1, C = !1) {
  var m = l, e = "";
  if (s)
    var o = (
      /** @type {Element} */
      l
    );
  _(() => {
    var r = (
      /** @type {Effect} */
      h
    );
    if (e !== (e = u() ?? "")) {
      if (s) {
        r.nodes = null, o.innerHTML = /** @type {string} */
        e, e !== "" && d(
          /** @type {TemplateNode} */
          n(o),
          /** @type {TemplateNode} */
          o.lastChild
        );
        return;
      }
      if (r.nodes !== null && (M(
        r.nodes.start,
        /** @type {TemplateNode} */
        r.nodes.end
      ), r.nodes = null), e !== "") {
        var c = t ? p : i ? v : void 0, a = (
          /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */
          A(t ? "svg" : i ? "math" : "template", c)
        );
        a.innerHTML = /** @type {any} */
        e;
        var f = t || i ? a : (
          /** @type {HTMLTemplateElement} */
          a.content
        );
        if (d(
          /** @type {TemplateNode} */
          n(f),
          /** @type {TemplateNode} */
          f.lastChild
        ), t || i)
          for (; n(f); )
            m.before(
              /** @type {TemplateNode} */
              n(f)
            );
        else
          m.before(f);
      }
    }
  });
}
export {
  T as html
};
