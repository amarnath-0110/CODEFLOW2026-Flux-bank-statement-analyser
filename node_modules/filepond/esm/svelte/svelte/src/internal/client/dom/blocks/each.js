import { EACH_INDEX_REACTIVE as J, EACH_ITEM_REACTIVE as K, EACH_ITEM_IMMUTABLE as P, EACH_IS_CONTROLLED as V, EACH_IS_ANIMATED as Q } from "../../../../constants.js";
import { EFFECT_OFFSCREEN as C, DESTROYED as W, INERT as N, BRANCH_EFFECT as Z } from "../../constants.js";
import { should_defer_append as $, create_text as R, get_next_sibling as j, clear_text_content as y } from "../operations.js";
import { block as ee, branch as z, resume_effect as U, pause_effect as X, move_effect as re, destroy_effect as ne } from "../../reactivity/effects.js";
import { internal_set as O, source as L, mutable_source as fe } from "../../reactivity/sources.js";
import { array_from as H, is_array as ie } from "../../../shared/utils.js";
import { queue_micro_task as le } from "../task.js";
import { get as q } from "../../runtime.js";
import { derived_safe_equal as oe } from "../../reactivity/deriveds.js";
import { current_batch as ue } from "../../reactivity/batch.js";
import { each_key_duplicate as ae } from "../../errors.js";
function Ae(e, n) {
  return n;
}
function ve(e, n, o) {
  for (var v = [], d = n.length, l, u = n.length, c = 0; c < d; c++) {
    let _ = n[c];
    X(
      _,
      () => {
        if (l) {
          if (l.pending.delete(_), l.done.add(_), l.pending.size === 0) {
            var t = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            D(e, H(l.done)), t.delete(l), t.size === 0 && (e.outrogroups = null);
          }
        } else
          u -= 1;
      },
      !1
    );
  }
  if (u === 0) {
    var i = v.length === 0 && o !== null;
    if (i) {
      var s = (
        /** @type {Element} */
        o
      ), f = (
        /** @type {Element} */
        s.parentNode
      );
      y(f), f.append(s), e.items.clear();
    }
    D(e, n, !i);
  } else
    l = {
      pending: new Set(n),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(l);
}
function D(e, n, o = !0) {
  var v;
  if (e.pending.size > 0) {
    v = /* @__PURE__ */ new Set();
    for (const u of e.pending.values())
      for (const c of u)
        v.add(
          /** @type {EachItem} */
          e.items.get(c).e
        );
  }
  for (var d = 0; d < n.length; d++) {
    var l = n[d];
    if (v?.has(l)) {
      l.f |= C;
      const u = document.createDocumentFragment();
      re(l, u);
    } else
      ne(n[d], o);
  }
}
var B;
function Te(e, n, o, v, d, l = null) {
  var u = e, c = /* @__PURE__ */ new Map(), i = (n & V) !== 0;
  if (i) {
    var s = (
      /** @type {Element} */
      e
    );
    u = s.appendChild(R());
  }
  var f = null, _ = oe(() => {
    var p = o();
    return ie(p) ? p : p == null ? [] : H(p);
  }), t, E = /* @__PURE__ */ new Map(), w = !0;
  function I(p) {
    (A.effect.f & W) === 0 && (A.pending.delete(p), A.fallback = f, te(A, t, u, n, v), f !== null && (t.length === 0 ? (f.f & C) === 0 ? U(f) : (f.f ^= C, M(f, null, u)) : X(f, () => {
      f = null;
    })));
  }
  function r(p) {
    A.pending.delete(p);
  }
  var a = ee(() => {
    t = /** @type {V[]} */
    q(_);
    for (var p = t.length, g = /* @__PURE__ */ new Set(), S = (
      /** @type {Batch} */
      ue
    ), k = $(), h = 0; h < p; h += 1) {
      var x = t[h], b = v(x, h), m = w ? null : c.get(b);
      m ? (m.v && O(m.v, x), m.i && O(m.i, h), k && S.unskip_effect(m.e)) : (m = pe(
        c,
        w ? u : B ??= R(),
        x,
        b,
        h,
        d,
        n,
        o
      ), w || (m.e.f |= C), c.set(b, m)), g.add(b);
    }
    if (p === 0 && l && !f && (w ? f = z(() => l(u)) : (f = z(() => l(B ??= R())), f.f |= C)), p > g.size && ae(), !w)
      if (E.set(S, g), k) {
        for (const [Y, G] of c)
          g.has(Y) || S.skip_effect(G.e);
        S.oncommit(I), S.ondiscard(r);
      } else
        I(S);
    q(_);
  }), A = { effect: a, items: c, pending: E, outrogroups: null, fallback: f };
  w = !1;
}
function F(e) {
  for (; e !== null && (e.f & Z) === 0; )
    e = e.next;
  return e;
}
function te(e, n, o, v, d) {
  var l = (v & Q) !== 0, u = n.length, c = e.items, i = F(e.effect.first), s, f = null, _, t = [], E = [], w, I, r, a;
  if (l)
    for (a = 0; a < u; a += 1)
      w = n[a], I = d(w, a), r = /** @type {EachItem} */
      c.get(I).e, (r.f & C) === 0 && (r.nodes?.a?.measure(), (_ ??= /* @__PURE__ */ new Set()).add(r));
  for (a = 0; a < u; a += 1) {
    if (w = n[a], I = d(w, a), r = /** @type {EachItem} */
    c.get(I).e, e.outrogroups !== null)
      for (const m of e.outrogroups)
        m.pending.delete(r), m.done.delete(r);
    if ((r.f & N) !== 0 && (U(r), l && (r.nodes?.a?.unfix(), (_ ??= /* @__PURE__ */ new Set()).delete(r))), (r.f & C) !== 0)
      if (r.f ^= C, r === i)
        M(r, null, o);
      else {
        var A = f ? f.next : i;
        r === e.effect.last && (e.effect.last = r.prev), r.prev && (r.prev.next = r.next), r.next && (r.next.prev = r.prev), T(e, f, r), T(e, r, A), M(r, A, o), f = r, t = [], E = [], i = F(f.next);
        continue;
      }
    if (r !== i) {
      if (s !== void 0 && s.has(r)) {
        if (t.length < E.length) {
          var p = E[0], g;
          f = p.prev;
          var S = t[0], k = t[t.length - 1];
          for (g = 0; g < t.length; g += 1)
            M(t[g], p, o);
          for (g = 0; g < E.length; g += 1)
            s.delete(E[g]);
          T(e, S.prev, k.next), T(e, f, S), T(e, k, p), i = p, f = k, a -= 1, t = [], E = [];
        } else
          s.delete(r), M(r, i, o), T(e, r.prev, r.next), T(e, r, f === null ? e.effect.first : f.next), T(e, f, r), f = r;
        continue;
      }
      for (t = [], E = []; i !== null && i !== r; )
        (s ??= /* @__PURE__ */ new Set()).add(i), E.push(i), i = F(i.next);
      if (i === null)
        continue;
    }
    (r.f & C) === 0 && t.push(r), f = r, i = F(r.next);
  }
  if (e.outrogroups !== null) {
    for (const m of e.outrogroups)
      m.pending.size === 0 && (D(e, H(m.done)), e.outrogroups?.delete(m));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (i !== null || s !== void 0) {
    var h = [];
    if (s !== void 0)
      for (r of s)
        (r.f & N) === 0 && h.push(r);
    for (; i !== null; )
      (i.f & N) === 0 && i !== e.fallback && h.push(i), i = F(i.next);
    var x = h.length;
    if (x > 0) {
      var b = (v & V) !== 0 && u === 0 ? o : null;
      if (l) {
        for (a = 0; a < x; a += 1)
          h[a].nodes?.a?.measure();
        for (a = 0; a < x; a += 1)
          h[a].nodes?.a?.fix();
      }
      ve(e, h, b);
    }
  }
  l && le(() => {
    if (_ !== void 0)
      for (r of _)
        r.nodes?.a?.apply();
  });
}
function pe(e, n, o, v, d, l, u, c) {
  var i = (u & K) !== 0 ? (u & P) === 0 ? fe(o, !1, !1) : L(o) : null, s = (u & J) !== 0 ? L(d) : null;
  return {
    v: i,
    i: s,
    e: z(() => (l(n, i ?? o, s ?? d, c), () => {
      e.delete(v);
    }))
  };
}
function M(e, n, o) {
  if (e.nodes)
    for (var v = e.nodes.start, d = e.nodes.end, l = n && (n.f & C) === 0 ? (
      /** @type {EffectNodes} */
      n.nodes.start
    ) : o; v !== null; ) {
      var u = (
        /** @type {TemplateNode} */
        j(v)
      );
      if (l.before(v), v === d)
        return;
      v = u;
    }
}
function T(e, n, o) {
  n === null ? e.effect.first = o : n.next = o, o === null ? e.effect.last = n : o.prev = n;
}
export {
  Te as each,
  Ae as index
};
