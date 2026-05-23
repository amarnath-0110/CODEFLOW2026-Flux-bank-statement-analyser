import { set_active_reaction as C, remove_reactions as I, active_reaction as a, untracking as k, active_effect as p, is_destroying_effect as N, update_effect as Y, get as B, set_is_destroying_effect as x } from "../runtime.js";
import { BRANCH_EFFECT as _, ROOT_EFFECT as v, HEAD_EFFECT as L, DESTROYING as R, DESTROYED as P, REACTION_RAN as G, CLEAN as A, INERT as s, EFFECT as m, EFFECT_PRESERVED as E, BLOCK_EFFECT as h, EFFECT_TRANSPARENT as d, DERIVED as H, RENDER_EFFECT as T, MANAGED_EFFECT as V, DIRTY as D, CONNECTED as K, ASYNC as M, USER_EFFECT as U, STALE_REACTION as j } from "../constants.js";
import { effect_orphan as q, effect_in_unowned_derived as z, effect_in_teardown as J } from "../errors.js";
import { get_next_sibling as b } from "../dom/operations.js";
import { component_context as O } from "../context.js";
import { current_batch as Q, collected_effects as g, Batch as w } from "./batch.js";
import { flatten as W } from "./async.js";
import { without_reactive_context as X } from "../dom/elements/bindings/shared.js";
import { set_signal_status as F } from "./status.js";
function Z(n) {
  p === null && (a === null && q(), z()), N && J();
}
function $(n, t) {
  var r = t.last;
  r === null ? t.last = t.first = n : (r.next = n, n.prev = r, t.last = n);
}
function o(n, t) {
  var r = p;
  r !== null && (r.f & s) !== 0 && (n |= s);
  var e = {
    ctx: O,
    deps: null,
    nodes: null,
    f: n | D | K,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: r,
    b: r && r.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  Q?.register_created_effect(e);
  var l = e;
  if ((n & m) !== 0)
    g !== null ? g.push(e) : w.ensure().schedule(e);
  else if (t !== null) {
    try {
      Y(e);
    } catch (u) {
      throw f(e), u;
    }
    l.deps === null && l.teardown === null && l.nodes === null && l.first === l.last && // either `null`, or a singular child
    (l.f & E) === 0 && (l = l.first, (n & h) !== 0 && (n & d) !== 0 && l !== null && (l.f |= d));
  }
  if (l !== null && (l.parent = r, r !== null && $(l, r), a !== null && (a.f & H) !== 0 && (n & v) === 0)) {
    var i = (
      /** @type {Derived} */
      a
    );
    (i.effects ??= []).push(l);
  }
  return e;
}
function pn() {
  return a !== null && !k;
}
function mn(n) {
  const t = o(T, null);
  return F(t, A), t.teardown = n, t;
}
function hn(n) {
  Z();
  var t = (
    /** @type {Effect} */
    p.f
  ), r = !a && (t & _) !== 0 && (t & G) === 0;
  if (r) {
    var e = (
      /** @type {ComponentContext} */
      O
    );
    (e.e ??= []).push(n);
  } else
    return nn(n);
}
function nn(n) {
  return o(m | U, n);
}
function Tn(n) {
  w.ensure();
  const t = o(v | E, n);
  return (r = {}) => new Promise((e) => {
    r.outro ? on(t, () => {
      f(t), e(void 0);
    }) : (f(t), e(void 0));
  });
}
function wn(n) {
  return o(m, n);
}
function Fn(n) {
  return o(M | E, n);
}
function Cn(n, t = 0) {
  return o(T | t, n);
}
function xn(n, t = [], r = [], e = []) {
  W(e, t, r, (l) => {
    o(T, () => n(...l.map(B)));
  });
}
function Rn(n, t = 0) {
  var r = o(h | t, n);
  return r;
}
function gn(n, t = 0) {
  var r = o(V | t, n);
  return r;
}
function Nn(n) {
  return o(_ | E, n);
}
function rn(n) {
  var t = n.teardown;
  if (t !== null) {
    const r = N, e = a;
    x(!0), C(null);
    try {
      t.call(null);
    } finally {
      x(r), C(e);
    }
  }
}
function tn(n, t = !1) {
  var r = n.first;
  for (n.first = n.last = null; r !== null; ) {
    const l = r.ac;
    l !== null && X(() => {
      l.abort(j);
    });
    var e = r.next;
    (r.f & v) !== 0 ? r.parent = null : f(r, t), r = e;
  }
}
function An(n) {
  for (var t = n.first; t !== null; ) {
    var r = t.next;
    (t.f & _) === 0 && f(t), t = r;
  }
}
function f(n, t = !0) {
  var r = !1;
  (t || (n.f & L) !== 0) && n.nodes !== null && n.nodes.end !== null && (en(
    n.nodes.start,
    /** @type {TemplateNode} */
    n.nodes.end
  ), r = !0), F(n, R), tn(n, t && !r), I(n, 0);
  var e = n.nodes && n.nodes.t;
  if (e !== null)
    for (const i of e)
      i.stop();
  rn(n), n.f ^= R, n.f |= P;
  var l = n.parent;
  l !== null && l.first !== null && ln(n), n.next = n.prev = n.teardown = n.ctx = n.deps = n.fn = n.nodes = n.ac = n.b = null;
}
function en(n, t) {
  for (; n !== null; ) {
    var r = n === t ? null : b(n);
    n.remove(), n = r;
  }
}
function ln(n) {
  var t = n.parent, r = n.prev, e = n.next;
  r !== null && (r.next = e), e !== null && (e.prev = r), t !== null && (t.first === n && (t.first = e), t.last === n && (t.last = r));
}
function on(n, t, r = !0) {
  var e = [];
  S(n, e, !0);
  var l = () => {
    r && f(n), t && t();
  }, i = e.length;
  if (i > 0) {
    var u = () => --i || l();
    for (var c of e)
      c.out(u);
  } else
    l();
}
function S(n, t, r) {
  if ((n.f & s) === 0) {
    n.f ^= s;
    var e = n.nodes && n.nodes.t;
    if (e !== null)
      for (const c of e)
        (c.is_global || r) && t.push(c);
    for (var l = n.first; l !== null; ) {
      var i = l.next;
      if ((l.f & v) === 0) {
        var u = (l.f & d) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (l.f & _) !== 0 && (n.f & h) !== 0;
        S(l, t, u ? r : !1);
      }
      l = i;
    }
  }
}
function Dn(n) {
  y(n, !0);
}
function y(n, t) {
  if ((n.f & s) !== 0) {
    n.f ^= s, (n.f & A) === 0 && (F(n, D), w.ensure().schedule(n));
    for (var r = n.first; r !== null; ) {
      var e = r.next, l = (r.f & d) !== 0 || (r.f & _) !== 0;
      y(r, l ? t : !1), r = e;
    }
    var i = n.nodes && n.nodes.t;
    if (i !== null)
      for (const u of i)
        (u.is_global || t) && u.in();
  }
}
function bn(n, t) {
  if (n.nodes)
    for (var r = n.nodes.start, e = n.nodes.end; r !== null; ) {
      var l = r === e ? null : b(r);
      t.append(r), r = l;
    }
}
export {
  Fn as async_effect,
  Rn as block,
  Nn as branch,
  Tn as component_root,
  nn as create_user_effect,
  An as destroy_block_effect_children,
  f as destroy_effect,
  tn as destroy_effect_children,
  wn as effect,
  pn as effect_tracking,
  rn as execute_effect_teardown,
  gn as managed,
  bn as move_effect,
  on as pause_effect,
  en as remove_effect_dom,
  Cn as render_effect,
  Dn as resume_effect,
  mn as teardown,
  xn as template_effect,
  ln as unlink_effect,
  hn as user_effect,
  Z as validate_effect
};
