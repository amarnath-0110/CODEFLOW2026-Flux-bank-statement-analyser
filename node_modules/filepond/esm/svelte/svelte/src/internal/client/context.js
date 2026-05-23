import { lifecycle_outside_component as c } from "../shared/errors.js";
import { active_effect as l } from "./runtime.js";
import { create_user_effect as f } from "./reactivity/effects.js";
let o = null;
function a(n) {
  o = n;
}
function m(n) {
  return (
    /** @type {T} */
    r().get(n)
  );
}
function x(n, t) {
  return r().set(n, t), t;
}
function d(n, t = !1, e) {
  o = {
    p: o,
    i: !1,
    c: null,
    e: null,
    s: n,
    x: null,
    r: (
      /** @type {Effect} */
      l
    ),
    l: null
  };
}
function g(n) {
  var t = (
    /** @type {ComponentContext} */
    o
  ), e = t.e;
  if (e !== null) {
    t.e = null;
    for (var u of e)
      f(u);
  }
  return n !== void 0 && (t.x = n), t.i = !0, o = t.p, n ?? /** @type {T} */
  {};
}
function v() {
  return !0;
}
function r(n) {
  return o === null && c(), o.c ??= new Map(i(o) || void 0);
}
function i(n) {
  let t = n.p;
  for (; t !== null; ) {
    const e = t.c;
    if (e !== null)
      return e;
    t = t.p;
  }
  return null;
}
export {
  o as component_context,
  m as getContext,
  v as is_runes,
  g as pop,
  d as push,
  x as setContext,
  a as set_component_context
};
