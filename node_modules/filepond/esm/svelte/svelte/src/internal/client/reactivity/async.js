import { DESTROYED as h } from "../constants.js";
import { set_component_context as g, component_context as y } from "../context.js";
import { invoke_error_boundary as d } from "../error-handling.js";
import { active_effect as p, set_active_effect as b, set_active_reaction as x, active_reaction as D } from "../runtime.js";
import { current_batch as u } from "./batch.js";
import { derived as E, async_derived as P } from "./deriveds.js";
function z(t, n, r, i) {
  const a = E;
  var o = t.filter((e) => !e.settled);
  if (r.length === 0 && o.length === 0) {
    i(n.map(a));
    return;
  }
  var c = (
    /** @type {Effect} */
    p
  ), m = O(), f = o.length === 1 ? o[0].promise : o.length > 1 ? Promise.all(o.map((e) => e.promise)) : null;
  function l(e) {
    if ((c.f & h) === 0) {
      m();
      try {
        i(e);
      } catch (k) {
        d(k, c);
      }
      s();
    }
  }
  var _ = R();
  if (r.length === 0) {
    f.then(() => l(n.map(a))).finally(_);
    return;
  }
  function v() {
    Promise.all(r.map((e) => P(e))).then((e) => l([...n.map(a), ...e])).catch((e) => d(e, c)).finally(_);
  }
  f ? f.then(() => {
    m(), v(), s();
  }) : v();
}
function O() {
  var t = (
    /** @type {Effect} */
    p
  ), n = D, r = y, i = (
    /** @type {Batch} */
    u
  );
  return function(o = !0) {
    b(t), x(n), g(r), o && (t.f & h) === 0 && (i?.activate(), i?.apply());
  };
}
function s(t = !0) {
  b(null), x(null), g(null), t && u?.deactivate();
}
function R() {
  var t = (
    /** @type {Effect} */
    p
  ), n = (
    /** @type {Boundary} */
    t.b
  ), r = (
    /** @type {Batch} */
    u
  ), i = n.is_rendered();
  return n.update_pending_count(1, r), r.increment(i, t), () => {
    n.update_pending_count(-1, r), r.decrement(i, t);
  };
}
export {
  O as capture,
  z as flatten,
  R as increment_pending,
  s as unset_context
};
