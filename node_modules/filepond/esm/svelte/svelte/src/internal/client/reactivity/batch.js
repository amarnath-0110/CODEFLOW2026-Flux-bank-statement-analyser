import { DIRTY as m, MAYBE_DIRTY as D, CLEAN as p, INERT as w, EFFECT as Y, BLOCK_EFFECT as g, ERROR_VALUE as J, ASYNC as R, DESTROYED as F, EAGER_EFFECT as P, RENDER_EFFECT as Q, MANAGED_EFFECT as W, REACTION_RAN as X, ROOT_EFFECT as L, BRANCH_EFFECT as N, DERIVED as T } from "../constants.js";
import { deferred as $, includes as ee } from "../../shared/utils.js";
import { is_dirty as j, update_effect as I, active_effect as te, active_reaction as V } from "../runtime.js";
import { effect_update_depth_exceeded as ie } from "../errors.js";
import { queue_micro_task as q } from "../dom/task.js";
import se from "../../../../../esm-env/false.js";
import { invoke_error_boundary as re } from "../error-handling.js";
import { old_values as z } from "./sources.js";
import { unlink_effect as ne } from "./effects.js";
import { defer_effect as le } from "./utils.js";
import { UNINITIALIZED as fe } from "../../../constants.js";
import { set_signal_status as d } from "./status.js";
let C = null, E = null, a = null, B = null, b = null, M = null, S = !1, y = null, A = null;
var G = 0;
let oe = 1;
class x {
  id = oe++;
  /** True as soon as `#process` was called */
  #u = !1;
  linked = !0;
  /** @type {Batch | null} */
  #r = null;
  /** @type {Batch | null} */
  #f = null;
  /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
  async_deriveds = /* @__PURE__ */ new Map();
  /**
   * The current values of any signals that are updated in this batch.
   * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Value, [any, boolean]>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Value, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * Async effects which this batch doesn't take into account anymore when calculating blockers,
   * as it has a value for it already.
   * @type {Set<Effect>}
   */
  unblocked = /* @__PURE__ */ new Set();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<(batch: Batch) => void>}
   */
  #a = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #c = /* @__PURE__ */ new Set();
  /**
   * Callbacks that should run only when a fork is committed.
   * @type {Set<(batch: Batch) => void>}
   */
  #o = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #d = 0;
  /**
   * Async effects that are currently in flight, _not_ inside a pending boundary
   * @type {Map<Effect, number>}
   */
  #s = /* @__PURE__ */ new Map();
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #m = null;
  /**
   * The root effects that need to be flushed
   * @type {Effect[]}
   */
  #e = [];
  /**
   * Effects created while this batch was active.
   * @type {Effect[]}
   */
  #E = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #n = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #i = /* @__PURE__ */ new Map();
  /**
   * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
   * @type {Set<Effect>}
   */
  #_ = /* @__PURE__ */ new Set();
  is_fork = !1;
  #p = !1;
  #g() {
    if (this.is_fork) return !0;
    for (const i of this.#s.keys()) {
      for (var e = i, t = !1; e.parent !== null; ) {
        if (this.#i.has(e)) {
          t = !0;
          break;
        }
        e = e.parent;
      }
      if (!t)
        return !0;
    }
    return !1;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    this.#i.has(e) || this.#i.set(e, { d: [], m: [] }), this.#_.delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, t = (i) => this.schedule(i)) {
    var i = this.#i.get(e);
    if (i) {
      this.#i.delete(e);
      for (var s of i.d)
        d(s, m), t(s);
      for (s of i.m)
        d(s, D), t(s);
    }
    this.#_.add(e);
  }
  #h() {
    if (this.#u = !0, G++ > 1e3 && (this.#l(), he()), !this.#g()) {
      for (const l of this.#n)
        this.#t.delete(l), d(l, m), this.schedule(l);
      for (const l of this.#t)
        d(l, D), this.schedule(l);
    }
    const e = this.#e;
    this.#e = [], this.apply();
    var t = y = [], i = [], s = A = [];
    for (const l of e)
      try {
        this.#w(l, t, i);
      } catch (c) {
        throw Z(l), c;
      }
    if (a = null, s.length > 0) {
      var f = x.ensure();
      for (const l of s)
        f.schedule(l);
    }
    if (y = null, A = null, this.#g()) {
      this.#v(i), this.#v(t);
      for (const [l, c] of this.#i)
        K(l, c);
      s.length > 0 && /** @type {unknown} */
      a.#h();
      return;
    }
    const o = this.#b();
    if (o) {
      o.#y(this);
      return;
    }
    this.#n.clear(), this.#t.clear();
    for (const l of this.#a) l(this);
    this.#a.clear(), B = this, U(i), U(t), B = null, this.#m?.resolve();
    var u = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      a
    );
    if (this.linked && this.#d === 0 && this.#l(), this.#e.length > 0) {
      u === null && (u = this, this.#k());
      const l = u;
      l.#e.push(...this.#e.filter((c) => !l.#e.includes(c)));
    }
    u !== null && u.#h();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #w(e, t, i) {
    e.f ^= p;
    for (var s = e.first; s !== null; ) {
      var f = s.f, o = (f & (N | L)) !== 0, u = o && (f & p) !== 0, l = u || (f & w) !== 0 || this.#i.has(s);
      if (!l && s.fn !== null) {
        o ? s.f ^= p : (f & Y) !== 0 ? t.push(s) : j(s) && ((f & g) !== 0 && this.#t.add(s), I(s));
        var c = s.first;
        if (c !== null) {
          s = c;
          continue;
        }
      }
      for (; s !== null; ) {
        var n = s.next;
        if (n !== null) {
          s = n;
          break;
        }
        s = s.parent;
      }
    }
  }
  #b() {
    for (var e = this.#r; e !== null; ) {
      if (!e.is_fork) {
        for (const [t, [, i]] of this.current)
          if (e.current.has(t) && !i)
            return e;
      }
      e = e.#r;
    }
    return null;
  }
  /**
   * @param {Batch} batch
   */
  #y(e) {
    for (const [i, s] of e.current)
      !this.previous.has(i) && e.previous.has(i) && this.previous.set(i, e.previous.get(i)), this.current.set(i, s);
    for (const [i, s] of e.async_deriveds) {
      const f = this.async_deriveds.get(i);
      f && s.promise.then(f.resolve);
    }
    const t = (i) => {
      var s = i.reactions;
      if (s !== null)
        for (const u of s) {
          var f = u.f;
          if ((f & T) !== 0)
            t(
              /** @type {Derived} */
              u
            );
          else {
            var o = (
              /** @type {Effect} */
              u
            );
            f & (R | g) && !this.async_deriveds.has(o) && (this.#t.delete(o), d(o, m), this.schedule(o));
          }
        }
    };
    for (const i of this.current.keys())
      t(i);
    this.oncommit(() => e.discard()), e.#l(), a = this, this.#h();
  }
  /**
   * @param {Effect[]} effects
   */
  #v(e) {
    for (var t = 0; t < e.length; t += 1)
      le(e[t], this.#n, this.#t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, t, i = !1) {
    e.v !== fe && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & J) === 0 && (this.current.set(e, [t, i]), b?.set(e, t)), this.is_fork || (e.v = t);
  }
  activate() {
    a = this;
  }
  deactivate() {
    a = null, b = null;
  }
  flush() {
    try {
      S = !0, a = this, this.#h();
    } finally {
      G = 0, M = null, y = null, A = null, S = !1, a = null, b = null, z.clear();
    }
  }
  discard() {
    for (const e of this.#c) e(this);
    this.#c.clear(), this.#o.clear(), this.#l();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    this.#E.push(e);
  }
  #R() {
    this.#l();
    for (let n = C; n !== null; n = n.#f) {
      var e = n.id < this.id, t = [];
      for (const [h, [_, k]] of this.current) {
        if (n.current.has(h)) {
          var i = (
            /** @type {[any, boolean]} */
            n.current.get(h)[0]
          );
          if (e && _ !== i)
            n.current.set(h, [_, k]);
          else
            continue;
        }
        t.push(h);
      }
      if (e)
        for (const [h, _] of this.async_deriveds) {
          const k = n.async_deriveds.get(h);
          k && _.promise.then(k.resolve);
        }
      if (n.#u) {
        var s = [...n.current.keys()].filter((h) => !this.current.has(h));
        if (s.length === 0)
          e && n.discard();
        else if (t.length > 0) {
          if (e)
            for (const h of this.#_)
              n.unskip_effect(h, (_) => {
                (_.f & (g | R)) !== 0 ? n.schedule(_) : n.#v([_]);
              });
          n.activate();
          var f = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
          for (var u of t)
            H(u, s, f, o);
          o = /* @__PURE__ */ new Map();
          var l = [...n.current.keys()].filter(
            (h) => this.current.has(h) ? (
              /** @type {[any, boolean]} */
              this.current.get(h)[0] !== h.v
            ) : !0
          );
          if (l.length > 0)
            for (const h of this.#E)
              (h.f & (F | w | P)) === 0 && O(h, l, o) && ((h.f & (R | g)) !== 0 ? (d(h, m), n.schedule(h)) : n.#n.add(h));
          if (n.#e.length > 0) {
            n.apply();
            for (var c of n.#e)
              n.#w(c, [], []);
            n.#e = [];
          }
          n.deactivate();
        }
      }
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, t) {
    if (this.#d += 1, e) {
      let i = this.#s.get(t) ?? 0;
      this.#s.set(t, i + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, t) {
    if (this.#d -= 1, e) {
      let i = this.#s.get(t) ?? 0;
      i === 1 ? this.#s.delete(t) : this.#s.set(t, i - 1);
    }
    this.#p || (this.#p = !0, q(() => {
      this.#p = !1, this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, t) {
    for (const i of e)
      this.#n.add(i);
    for (const i of t)
      this.#t.add(i);
    e.clear(), t.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    this.#a.add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    this.#c.add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(e) {
    this.#o.add(e);
  }
  run_fork_commit_callbacks() {
    for (const e of this.#o) e(this);
    this.#o.clear();
  }
  settled() {
    return (this.#m ??= $()).promise;
  }
  static ensure() {
    if (a === null) {
      const e = a = new x();
      e.#k(), S || q(() => {
        e.#u || e.flush();
      });
    }
    return a;
  }
  apply() {
    {
      b = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    if (M = e, e.b?.is_pending && (e.f & (Y | Q | W)) !== 0 && (e.f & X) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var i = t.f;
      if (y !== null && t === te && (V === null || (V.f & T) === 0))
        return;
      if ((i & (L | N)) !== 0) {
        if ((i & p) === 0)
          return;
        t.f ^= p;
      }
    }
    this.#e.push(t);
  }
  #k() {
    E === null ? C = E = this : (E.#f = this, this.#r = E), E = this;
  }
  #l() {
    var e = this.#r, t = this.#f;
    e === null ? C = t : e.#f = t, t === null ? E = e : t.#r = e, this.linked = !1;
  }
}
function he() {
  try {
    ie();
  } catch (r) {
    re(r, M);
  }
}
let v = null;
function U(r) {
  var e = r.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var i = r[t++];
      if ((i.f & (F | w)) === 0 && j(i) && (v = /* @__PURE__ */ new Set(), I(i), i.deps === null && i.first === null && i.nodes === null && i.teardown === null && i.ac === null && ne(i), v?.size > 0)) {
        z.clear();
        for (const s of v) {
          if ((s.f & (F | w)) !== 0) continue;
          const f = [s];
          let o = s.parent;
          for (; o !== null; )
            v.has(o) && (v.delete(o), f.push(o)), o = o.parent;
          for (let u = f.length - 1; u >= 0; u--) {
            const l = f[u];
            (l.f & (F | w)) === 0 && I(l);
          }
        }
        v.clear();
      }
    }
    v = null;
  }
}
function H(r, e, t, i) {
  if (!t.has(r) && (t.add(r), r.reactions !== null))
    for (const s of r.reactions) {
      const f = s.f;
      (f & T) !== 0 ? H(
        /** @type {Derived} */
        s,
        e,
        t,
        i
      ) : (f & (R | g)) !== 0 && (f & m) === 0 && O(s, e, i) && (d(s, m), ue(
        /** @type {Effect} */
        s
      ));
    }
}
function O(r, e, t) {
  const i = t.get(r);
  if (i !== void 0) return i;
  if (r.deps !== null)
    for (const s of r.deps) {
      if (ee.call(e, s))
        return !0;
      if ((s.f & T) !== 0 && O(
        /** @type {Derived} */
        s,
        e,
        t
      ))
        return t.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return t.set(r, !1), !1;
}
function ue(r) {
  a.schedule(r);
}
function K(r, e) {
  if (!((r.f & N) !== 0 && (r.f & p) !== 0)) {
    (r.f & m) !== 0 ? e.d.push(r) : (r.f & D) !== 0 && e.m.push(r), d(r, p);
    for (var t = r.first; t !== null; )
      K(t, e), t = t.next;
  }
}
function Z(r) {
  d(r, p);
  for (var e = r.first; e !== null; )
    Z(e), e = e.next;
}
export {
  x as Batch,
  b as batch_values,
  y as collected_effects,
  a as current_batch,
  v as eager_block_effects,
  A as legacy_updates,
  B as previous_batch,
  ue as schedule_effect
};
