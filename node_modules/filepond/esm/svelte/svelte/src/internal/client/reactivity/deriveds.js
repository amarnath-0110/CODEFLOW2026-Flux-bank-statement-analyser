import { DESTROYED as D, INERT as N, WAS_MARKED as S, STALE_REACTION as w, EFFECT_PRESERVED as x, DERIVED as O, DIRTY as j, REACTION_RAN as q, ERROR_VALUE as d, CLEAN as L } from "../constants.js";
import { increment_write_version as k, update_effect as C, set_active_effect as h, update_reaction as P, remove_reactions as V, active_effect as i, push_reaction_value as z, is_destroying_effect as b, active_reaction as F } from "../runtime.js";
import { equals as U, safe_equals as Y } from "./equality.js";
import { async_derived_orphan as B } from "../errors.js";
import { derived_inert as K } from "../warnings.js";
import { destroy_effect as M, destroy_effect_children as W, async_effect as Z, teardown as G, effect_tracking as H } from "./effects.js";
import { source as J, internal_set as y } from "./sources.js";
import { noop as Q, deferred as X } from "../../shared/utils.js";
import { component_context as $ } from "../context.js";
import { UNINITIALIZED as A } from "../../../constants.js";
import { current_batch as l, previous_batch as ee, batch_values as R } from "./batch.js";
import { unset_context as g, increment_pending as te } from "./async.js";
import { set_signal_status as re, update_derived_status as ne } from "./status.js";
// @__NO_SIDE_EFFECTS__
function I(e) {
  var t = O | j;
  return i !== null && (i.f |= x), {
    ctx: $,
    deps: null,
    effects: null,
    equals: U,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      A
    ),
    wv: 0,
    parent: i,
    ac: null
  };
}
const m = /* @__PURE__ */ Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function ye(e, t, f) {
  let c = (
    /** @type {Effect | null} */
    i
  );
  c === null && B();
  var u = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = J(
    /** @type {V} */
    A
  ), T = !F, _ = /* @__PURE__ */ new Set();
  return Z(() => {
    var o = (
      /** @type {Effect} */
      i
    ), r = X();
    u = r.promise;
    try {
      Promise.resolve(e()).then(r.resolve, (n) => {
        n !== w && r.reject(n);
      }).finally(g);
    } catch (n) {
      r.reject(n), g();
    }
    var a = (
      /** @type {Batch} */
      l
    );
    if (T) {
      if ((o.f & q) !== 0)
        var p = te();
      if (
        /** @type {Boundary} */
        c.b.is_rendered()
      )
        a.async_deriveds.get(o)?.reject(m);
      else
        for (const n of _.values())
          n.reject(m);
      _.add(r), a.async_deriveds.set(o, r);
    }
    const E = (n, v = void 0) => {
      p?.(), _.delete(r), v !== m && (a.activate(), v ? (s.f |= d, y(s, v)) : ((s.f & d) !== 0 && (s.f ^= d), y(s, n)), a.deactivate());
    };
    r.promise.then(E, (n) => E(null, n || "unknown"));
  }), G(() => {
    for (const o of _)
      o.reject(m);
  }), new Promise((o) => {
    function r(a) {
      function p() {
        a === u ? o(s) : r(u);
      }
      a.then(p, p);
    }
    r(u);
  });
}
// @__NO_SIDE_EFFECTS__
function Re(e) {
  const t = /* @__PURE__ */ I(e);
  return z(t), t;
}
// @__NO_SIDE_EFFECTS__
function ge(e) {
  const t = /* @__PURE__ */ I(e);
  return t.equals = Y, t;
}
function fe(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var f = 0; f < t.length; f += 1)
      M(
        /** @type {Effect} */
        t[f]
      );
  }
}
function oe(e) {
  var t, f = i, c = e.parent;
  if (!b && c !== null && (c.f & (D | N)) !== 0)
    return K(), e.v;
  h(c);
  try {
    e.f &= ~S, fe(e), t = P(e);
  } finally {
    h(f);
  }
  return t;
}
function we(e) {
  var t = oe(e);
  if (!e.equals(t) && (e.wv = k(), (!l?.is_fork || e.deps === null) && (l !== null ? (l.capture(e, t, !0), ee?.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    re(e, L);
    return;
  }
  b || (R !== null ? (H() || l?.is_fork) && R.set(e, t) : ne(e));
}
function be(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(w), t.teardown = Q, t.ac = null, V(t, 0), W(t));
}
function Ae(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && C(t);
}
export {
  m as OBSOLETE,
  ye as async_derived,
  I as derived,
  ge as derived_safe_equal,
  fe as destroy_derived_effects,
  oe as execute_derived,
  be as freeze_derived_effects,
  Ae as unfreeze_derived_effects,
  we as update_derived,
  Re as user_derived
};
