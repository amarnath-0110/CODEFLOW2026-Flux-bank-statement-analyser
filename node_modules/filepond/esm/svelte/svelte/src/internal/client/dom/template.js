import { TEMPLATE_FRAGMENT as c, TEMPLATE_USE_IMPORT_NODE as h } from "../../../constants.js";
import { create_text as d, get_first_child as o, is_firefox as g } from "./operations.js";
import { create_fragment_from_html as l } from "./reconciler.js";
import { active_effect as E } from "../runtime.js";
function i(r, e) {
  var t = (
    /** @type {Effect} */
    E
  );
  t.nodes === null && (t.nodes = { start: r, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function A(r, e) {
  var t = (e & c) !== 0, u = (e & h) !== 0, n, s = !r.startsWith("<!>");
  return () => {
    n === void 0 && (n = l(s ? r : "<!>" + r), t || (n = /** @type {TemplateNode} */
    o(n)));
    var a = (
      /** @type {TemplateNode} */
      u || g ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    if (t) {
      var v = (
        /** @type {TemplateNode} */
        o(a)
      ), f = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      i(v, f);
    } else
      i(a, a);
    return a;
  };
}
// @__NO_SIDE_EFFECTS__
function T(r, e, t = "svg") {
  var u = !r.startsWith("<!>"), n = (e & c) !== 0, s = `<${t}>${u ? r : "<!>" + r}</${t}>`, a;
  return () => {
    if (!a) {
      var v = (
        /** @type {DocumentFragment} */
        l(s)
      ), f = (
        /** @type {Element} */
        o(v)
      );
      if (n)
        for (a = document.createDocumentFragment(); o(f); )
          a.appendChild(
            /** @type {TemplateNode} */
            o(f)
          );
      else
        a = /** @type {Element} */
        o(f);
    }
    var m = (
      /** @type {TemplateNode} */
      a.cloneNode(!0)
    );
    if (n) {
      var _ = (
        /** @type {TemplateNode} */
        o(m)
      ), p = (
        /** @type {TemplateNode} */
        m.lastChild
      );
      i(_, p);
    } else
      i(m, m);
    return m;
  };
}
// @__NO_SIDE_EFFECTS__
function D(r, e) {
  return /* @__PURE__ */ T(r, e, "svg");
}
function F(r = "") {
  {
    var e = d(r + "");
    return i(e, e), e;
  }
}
function P() {
  var r = document.createDocumentFragment(), e = document.createComment(""), t = d();
  return r.append(e, t), i(e, t), r;
}
function $(r, e) {
  r !== null && r.before(
    /** @type {Node} */
    e
  );
}
export {
  $ as append,
  i as assign_nodes,
  P as comment,
  A as from_html,
  D as from_svg,
  F as text
};
