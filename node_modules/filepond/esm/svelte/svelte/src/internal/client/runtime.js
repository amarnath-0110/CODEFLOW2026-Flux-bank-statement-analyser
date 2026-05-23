import X from "../../../../esm-env/false.js";
import { includes as N, index_of as $ } from "../shared/utils.js";
import { destroy_block_effect_children as d, destroy_effect_children as ff, execute_effect_teardown as rf, effect_tracking as tf } from "./reactivity/effects.js";
import { CONNECTED as m, REACTION_RAN as U, ERROR_VALUE as F, DERIVED as A, DIRTY as g, MAYBE_DIRTY as Y, DESTROYED as V, CLEAN as O, BLOCK_EFFECT as lf, MANAGED_EFFECT as ef, BRANCH_EFFECT as uf, ROOT_EFFECT as nf, REACTION_IS_UPDATING as y, WAS_MARKED as z, STALE_REACTION as _f } from "./constants.js";
import { old_values as C } from "./reactivity/sources.js";
import { update_derived as G, unfreeze_derived_effects as K, freeze_derived_effects as sf, execute_derived as of } from "./reactivity/deriveds.js";
import { tracing_mode_flag as af } from "../flags/index.js";
import { UNINITIALIZED as H } from "../../constants.js";
import { set_component_context as M, is_runes as vf, component_context as pf } from "./context.js";
import { batch_values as b, current_batch as cf, schedule_effect as mf } from "./reactivity/batch.js";
import { handle_error as hf } from "./error-handling.js";
import { without_reactive_context as Ef } from "./dom/elements/bindings/shared.js";
import { set_signal_status as k, update_derived_status as Af } from "./reactivity/status.js";
let D = !1, L = !1;
function Sf(f) {
  L = f;
}
let _ = null, c = !1;
function Yf(f) {
  _ = f;
}
let T = null;
function Bf(f) {
  T = f;
}
let p = null;
function Mf(f) {
  _ !== null && (p === null ? p = [f] : p.push(f));
}
let s = null, i = 0, v = null;
function Uf(f) {
  v = f;
}
let P = 1, E = 0, I = E;
function Vf(f) {
  I = f;
}
function zf() {
  return ++P;
}
function W(f) {
  var r = f.f;
  if ((r & g) !== 0)
    return !0;
  if (r & A && (f.f &= ~z), (r & Y) !== 0) {
    for (var l = (
      /** @type {Value[]} */
      f.deps
    ), u = l.length, e = 0; e < u; e++) {
      var t = l[e];
      if (W(
        /** @type {Derived} */
        t
      ) && G(
        /** @type {Derived} */
        t
      ), t.wv > f.wv)
        return !0;
    }
    (r & m) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    b === null && k(f, O);
  }
  return !1;
}
function Z(f, r, l = !0) {
  var u = f.reactions;
  if (u !== null && !(p !== null && N.call(p, f)))
    for (var e = 0; e < u.length; e++) {
      var t = u[e];
      (t.f & A) !== 0 ? Z(
        /** @type {Derived} */
        t,
        r,
        !1
      ) : r === t && (l ? k(t, g) : (t.f & O) !== 0 && k(t, Y), mf(
        /** @type {Effect} */
        t
      ));
    }
}
function Tf(f) {
  var r = s, l = i, u = v, e = _, t = p, n = pf, R = c, w = I, x = f.f;
  s = /** @type {null | Value[]} */
  null, i = 0, v = null, _ = (x & (uf | nf)) === 0 ? f : null, p = null, M(f.ctx), c = !1, I = ++E, f.ac !== null && (Ef(() => {
    f.ac.abort(_f);
  }), f.ac = null);
  try {
    f.f |= y;
    var J = (
      /** @type {Function} */
      f.fn
    ), Q = J();
    f.f |= U;
    var a = f.deps, B = cf?.is_fork;
    if (s !== null) {
      var o;
      if (B || S(f, i), a !== null && i > 0)
        for (a.length = i + s.length, o = 0; o < s.length; o++)
          a[i + o] = s[o];
      else
        f.deps = a = s;
      if (tf() && (f.f & m) !== 0)
        for (o = i; o < a.length; o++)
          (a[o].reactions ??= []).push(f);
    } else !B && a !== null && i < a.length && (S(f, i), a.length = i);
    if (vf() && v !== null && !c && a !== null && (f.f & (A | Y | g)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      v.length; o++)
        Z(
          v[o],
          /** @type {Effect} */
          f
        );
    if (e !== null && e !== f) {
      if (E++, e.deps !== null)
        for (let h = 0; h < l; h += 1)
          e.deps[h].rv = E;
      if (r !== null)
        for (const h of r)
          h.rv = E;
      v !== null && (u === null ? u = v : u.push(.../** @type {Source[]} */
      v));
    }
    return (f.f & F) !== 0 && (f.f ^= F), Q;
  } catch (h) {
    return hf(h);
  } finally {
    f.f ^= y, s = r, i = l, v = u, _ = e, p = t, M(n), c = R, I = w;
  }
}
function Rf(f, r) {
  let l = r.reactions;
  if (l !== null) {
    var u = $.call(l, f);
    if (u !== -1) {
      var e = l.length - 1;
      e === 0 ? l = r.reactions = null : (l[u] = l[e], l.pop());
    }
  }
  if (l === null && (r.f & A) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (s === null || !N.call(s, r))) {
    var t = (
      /** @type {Derived} */
      r
    );
    (t.f & m) !== 0 && (t.f ^= m, t.f &= ~z), t.v !== H && Af(t), sf(t), S(t, 0);
  }
}
function S(f, r) {
  var l = f.deps;
  if (l !== null)
    for (var u = r; u < l.length; u++)
      Rf(f, l[u]);
}
function Gf(f) {
  var r = f.f;
  if ((r & V) === 0) {
    k(f, O);
    var l = T, u = D;
    T = f, D = !0;
    try {
      (r & (lf | ef)) !== 0 ? d(f) : ff(f), rf(f);
      var e = Tf(f);
      f.teardown = typeof e == "function" ? e : null, f.wv = P;
      var t;
      X && af && (f.f & g) !== 0 && f.deps;
    } finally {
      D = u, T = l;
    }
  }
}
function Kf(f) {
  var r = f.f, l = (r & A) !== 0;
  if (_ !== null && !c) {
    var u = T !== null && (T.f & V) !== 0;
    if (!u && (p === null || !N.call(p, f))) {
      var e = _.deps;
      if ((_.f & y) !== 0)
        f.rv < E && (f.rv = E, s === null && e !== null && e[i] === f ? i++ : s === null ? s = [f] : s.push(f));
      else {
        (_.deps ??= []).push(f);
        var t = f.reactions;
        t === null ? f.reactions = [_] : N.call(t, _) || t.push(_);
      }
    }
  }
  if (L && C.has(f))
    return C.get(f);
  if (l) {
    var n = (
      /** @type {Derived} */
      f
    );
    if (L) {
      var R = n.v;
      return ((n.f & O) === 0 && n.reactions !== null || q(n)) && (R = of(n)), C.set(n, R), R;
    }
    var w = (n.f & m) === 0 && !c && _ !== null && (D || (_.f & m) !== 0), x = (n.f & U) === 0;
    W(n) && (w && (n.f |= m), G(n)), w && !x && (K(n), j(n));
  }
  if (b?.has(f))
    return b.get(f);
  if ((f.f & F) !== 0)
    throw f.v;
  return f.v;
}
function j(f) {
  if (f.f |= m, f.deps !== null)
    for (const r of f.deps)
      (r.reactions ??= []).push(f), (r.f & A) !== 0 && (r.f & m) === 0 && (K(
        /** @type {Derived} */
        r
      ), j(
        /** @type {Derived} */
        r
      ));
}
function q(f) {
  if (f.v === H) return !0;
  if (f.deps === null) return !1;
  for (const r of f.deps)
    if (C.has(r) || (r.f & A) !== 0 && q(
      /** @type {Derived} */
      r
    ))
      return !0;
  return !1;
}
function Hf(f) {
  var r = c;
  try {
    return c = !0, f();
  } finally {
    c = r;
  }
}
export {
  T as active_effect,
  _ as active_reaction,
  p as current_sources,
  Kf as get,
  zf as increment_write_version,
  L as is_destroying_effect,
  W as is_dirty,
  s as new_deps,
  Mf as push_reaction_value,
  S as remove_reactions,
  Bf as set_active_effect,
  Yf as set_active_reaction,
  Sf as set_is_destroying_effect,
  Uf as set_untracked_writes,
  Vf as set_update_version,
  i as skipped_deps,
  Hf as untrack,
  v as untracked_writes,
  c as untracking,
  Gf as update_effect,
  Tf as update_reaction,
  I as update_version,
  P as write_version
};
