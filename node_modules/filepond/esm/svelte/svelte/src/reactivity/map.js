import { state as h, source as d, set as u, increment as a } from "../internal/client/reactivity/sources.js";
import { update_version as f, get as i } from "../internal/client/runtime.js";
class M extends Map {
  /** @type {Map<K, Source<number>>} */
  #e = /* @__PURE__ */ new Map();
  #s = h(0);
  #r = h(0);
  #u = f || -1;
  /**
   * @param {Iterable<readonly [K, V]> | null | undefined} [value]
   */
  constructor(e) {
    if (super(), e) {
      for (var [r, s] of e)
        super.set(r, s);
      this.#r.v = super.size;
    }
  }
  /**
   * If the source is being created inside the same reaction as the SvelteMap instance,
   * we use `state` so that it will not be a dependency of the reaction. Otherwise we
   * use `source` so it will be.
   *
   * @template T
   * @param {T} value
   * @returns {Source<T>}
   */
  #t(e) {
    return f === this.#u ? h(e) : d(e);
  }
  /** @param {K} key */
  has(e) {
    var r = this.#e, s = r.get(e);
    if (s === void 0)
      if (super.has(e))
        s = this.#t(0), r.set(e, s);
      else
        return i(this.#s), !1;
    return i(s), !0;
  }
  /**
   * @param {(value: V, key: K, map: Map<K, V>) => void} callbackfn
   * @param {any} [this_arg]
   */
  forEach(e, r) {
    this.#i(), super.forEach(e, r);
  }
  /** @param {K} key */
  get(e) {
    var r = this.#e, s = r.get(e);
    if (s === void 0)
      if (super.has(e))
        s = this.#t(0), r.set(e, s);
      else {
        i(this.#s);
        return;
      }
    return i(s), super.get(e);
  }
  /**
   * @param {K} key
   * @param {V} value
   * */
  set(e, r) {
    var s = this.#e, t = s.get(e), p = super.get(e), v = super.set(e, r), n = this.#s;
    if (t === void 0)
      t = this.#t(0), s.set(e, t), u(this.#r, super.size), a(n);
    else if (p !== r) {
      a(t);
      var o = n.reactions === null ? null : new Set(n.reactions), l = o === null || !t.reactions?.every(
        (c) => (
          /** @type {NonNullable<typeof v_reactions>} */
          o.has(c)
        )
      );
      l && a(n);
    }
    return v;
  }
  /** @param {K} key */
  delete(e) {
    var r = this.#e, s = r.get(e), t = super.delete(e);
    return s !== void 0 && (r.delete(e), u(s, -1)), t && (u(this.#r, super.size), a(this.#s)), t;
  }
  clear() {
    if (super.size !== 0) {
      super.clear();
      var e = this.#e;
      u(this.#r, 0);
      for (var r of e.values())
        u(r, -1);
      a(this.#s), e.clear();
    }
  }
  #i() {
    i(this.#s);
    var e = this.#e;
    if (this.#r.v !== e.size) {
      for (var r of super.keys())
        if (!e.has(r)) {
          var s = this.#t(0);
          e.set(r, s);
        }
    }
    for ([, s] of this.#e)
      i(s);
  }
  keys() {
    return i(this.#s), super.keys();
  }
  values() {
    return this.#i(), super.values();
  }
  entries() {
    return this.#i(), super.entries();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return i(this.#r), super.size;
  }
}
export {
  M as SvelteMap
};
