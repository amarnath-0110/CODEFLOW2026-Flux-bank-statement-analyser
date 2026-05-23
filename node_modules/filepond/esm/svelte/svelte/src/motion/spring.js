import { deferred as M, noop as l } from "../internal/shared/utils.js";
import { get as o } from "../internal/client/runtime.js";
import { loop as u } from "../internal/client/loop.js";
import { raf as w } from "../internal/client/timing.js";
import { is_date as g } from "./utils.js";
import { state as f, set as h } from "../internal/client/reactivity/sources.js";
import { render_effect as v } from "../internal/client/reactivity/effects.js";
function a(r, s, t, i) {
  if (typeof t == "number" || g(t)) {
    const n = i - t, e = (t - s) / (r.dt || 1 / 60), p = r.opts.stiffness * n, b = r.opts.damping * e, y = (p - b) * r.inv_mass, d = (e + y) * r.dt;
    return Math.abs(d) < r.opts.precision && Math.abs(n) < r.opts.precision ? i : (r.settled = !1, g(t) ? new Date(t.getTime() + d) : t + d);
  } else {
    if (Array.isArray(t))
      return t.map(
        (n, e) => (
          // @ts-ignore
          a(r, s[e], t[e], i[e])
        )
      );
    if (typeof t == "object") {
      const n = {};
      for (const e in t)
        n[e] = a(r, s[e], t[e], i[e]);
      return n;
    } else
      throw new Error(`Cannot spring ${typeof t} values`);
  }
}
class c {
  #e = f(0.15);
  #r = f(0.8);
  #n = f(0.01);
  #t;
  #i;
  #h = (
    /** @type {T} */
    void 0
  );
  #f = 0;
  #o = 1;
  #p = 0;
  /** @type {import('../internal/client/types').Task | null} */
  #s = null;
  /** @type {ReturnType<typeof deferred> | null} */
  #m = null;
  /**
   * @param {T} value
   * @param {SpringOptions} [options]
   */
  constructor(s, t = {}) {
    this.#t = f(s), this.#i = f(s), typeof t.stiffness == "number" && (this.#e.v = m(t.stiffness, 0, 1)), typeof t.damping == "number" && (this.#r.v = m(t.damping, 0, 1)), typeof t.precision == "number" && (this.#n.v = t.precision);
  }
  /**
   * Create a spring whose value is bound to the return value of `fn`. This must be called
   * inside an effect root (for example, during component initialisation).
   *
   * ```svelte
   * <script>
   * 	import { Spring } from 'svelte/motion';
   *
   * 	let { number } = $props();
   *
   * 	const spring = Spring.of(() => number);
   * <\/script>
   * ```
   * @template U
   * @param {() => U} fn
   * @param {SpringOptions} [options]
   */
  static of(s, t) {
    const i = new c(s(), t);
    return v(() => {
      i.set(s());
    }), i;
  }
  /** @param {T} value */
  #d(s) {
    if (h(this.#i, s), this.#t.v ??= s, this.#h ??= this.#t.v, !this.#s) {
      this.#f = w.now();
      var t = 1e3 / (this.#p * 60);
      this.#s ??= u((i) => {
        this.#o = Math.min(this.#o + t, 1);
        const n = Math.min(i - this.#f, 1e3 / 30), e = {
          inv_mass: this.#o,
          opts: {
            stiffness: this.#e.v,
            damping: this.#r.v,
            precision: this.#n.v
          },
          settled: !0,
          dt: n * 60 / 1e3
        };
        var p = a(e, this.#h, this.#t.v, this.#i.v);
        return this.#h = this.#t.v, this.#f = i, h(this.#t, p), e.settled && (this.#s = null), !e.settled;
      });
    }
    return this.#s.promise;
  }
  /**
   * Sets `spring.target` to `value` and returns a `Promise` that resolves if and when `spring.current` catches up to it.
   *
   * If `options.instant` is `true`, `spring.current` immediately matches `spring.target`.
   *
   * If `options.preserveMomentum` is provided, the spring will continue on its current trajectory for
   * the specified number of milliseconds. This is useful for things like 'fling' gestures.
   *
   * @param {T} value
   * @param {SpringUpdateOptions} [options]
   */
  set(s, t) {
    if (this.#m?.reject(new Error("Aborted")), t?.instant || this.#t.v === void 0)
      return this.#s?.abort(), this.#s = null, h(this.#t, h(this.#i, s)), this.#h = s, Promise.resolve();
    t?.preserveMomentum && (this.#o = 0, this.#p = t.preserveMomentum);
    var i = this.#m = M();
    return i.promise.catch(l), this.#d(s).then(() => {
      i === this.#m && i.resolve(void 0);
    }), i.promise;
  }
  get current() {
    return o(this.#t);
  }
  get damping() {
    return o(this.#r);
  }
  set damping(s) {
    h(this.#r, m(s, 0, 1));
  }
  get precision() {
    return o(this.#n);
  }
  set precision(s) {
    h(this.#n, s);
  }
  get stiffness() {
    return o(this.#e);
  }
  set stiffness(s) {
    h(this.#e, m(s, 0, 1));
  }
  get target() {
    return o(this.#i);
  }
  set target(s) {
    this.set(s);
  }
}
function m(r, s, t) {
  return Math.max(s, Math.min(t, r));
}
export {
  c as Spring
};
