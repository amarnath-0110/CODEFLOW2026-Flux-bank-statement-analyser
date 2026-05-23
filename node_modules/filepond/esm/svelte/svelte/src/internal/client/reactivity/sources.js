import { increment_write_version as y, active_effect as s, is_dirty as O, update_effect as g, push_reaction_value as q, active_reaction as o, untracking as B, current_sources as d, is_destroying_effect as S, untracked_writes as C, set_untracked_writes as Y } from "../runtime.js";
import { equals as b, safe_equals as x } from "./equality.js";
import { DERIVED as p, DIRTY as c, EAGER_EFFECT as m, WAS_MARKED as T, CONNECTED as M, REACTION_IS_UPDATING as G, MAYBE_DIRTY as k, CLEAN as A, BLOCK_EFFECT as w, ASYNC as K, BRANCH_EFFECT as L, ROOT_EFFECT as z } from "../constants.js";
import { state_unsafe_mutation as H } from "../errors.js";
import { includes as P } from "../../shared/utils.js";
import { proxy as U } from "../proxy.js";
import { Batch as V, batch_values as F, schedule_effect as W, legacy_updates as j, eager_block_effects as h } from "./batch.js";
import { is_runes as J } from "../context.js";
import { execute_derived as Q } from "./deriveds.js";
import { update_derived_status as X, set_signal_status as R } from "./status.js";
let a = /* @__PURE__ */ new Set();
const Z = /* @__PURE__ */ new Map();
let D = !1;
function N(e, t) {
  var f = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: b,
    rv: 0,
    wv: 0
  };
  return f;
}
// @__NO_SIDE_EFFECTS__
function ce(e, t) {
  const f = N(e);
  return q(f), f;
}
// @__NO_SIDE_EFFECTS__
function me(e, t = !1, f = !0) {
  const r = N(e);
  return t || (r.equals = x), r;
}
function $(e, t, f = !1) {
  o !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!B || (o.f & m) !== 0) && J() && (o.f & (p | w | K | m)) !== 0 && (d === null || !P.call(d, e)) && H();
  let r = f ? U(t) : t;
  return ee(e, r, j);
}
function ee(e, t, f = null) {
  if (!e.equals(t)) {
    Z.set(e, S ? t : e.v);
    var r = V.ensure();
    if (r.capture(e, t), (e.f & p) !== 0) {
      const l = (
        /** @type {Derived} */
        e
      );
      (e.f & c) !== 0 && Q(l), F === null && X(l);
    }
    e.wv = y(), I(e, c, f), s !== null && (s.f & A) !== 0 && (s.f & (L | z)) === 0 && (C === null ? Y([e]) : C.push(e)), !r.is_fork && a.size > 0 && !D && te();
  }
  return t;
}
function te() {
  D = !1;
  for (const e of a) {
    (e.f & A) !== 0 && R(e, k);
    let t;
    try {
      t = O(e);
    } catch {
      t = !0;
    }
    t && g(e);
  }
  a.clear();
}
function pe(e) {
  $(e, e.v + 1);
}
function I(e, t, f) {
  var r = e.reactions;
  if (r !== null)
    for (var l = r.length, _ = 0; _ < l; _++) {
      var n = r[_], i = n.f, v = (i & c) === 0;
      if (v && R(n, t), (i & m) !== 0)
        a.add(
          /** @type {Effect} */
          n
        );
      else if ((i & p) !== 0) {
        var E = (
          /** @type {Derived} */
          n
        );
        F?.delete(E), (i & T) === 0 && (i & M && (s === null || (s.f & G) === 0) && (n.f |= T), I(E, k, f));
      } else if (v) {
        var u = (
          /** @type {Effect} */
          n
        );
        (i & w) !== 0 && h !== null && h.add(u), f !== null ? f.push(u) : W(u);
      }
    }
}
export {
  a as eager_effects,
  te as flush_eager_effects,
  pe as increment,
  ee as internal_set,
  me as mutable_source,
  Z as old_values,
  $ as set,
  N as source,
  ce as state
};
