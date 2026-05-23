import { current_batch as l } from "../../reactivity/batch.js";
import { resume_effect as u, destroy_effect as n, pause_effect as m, branch as a, move_effect as p } from "../../reactivity/effects.js";
import { create_text as d, should_defer_append as _ } from "../operations.js";
class w {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #t = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #s = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #e = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #f = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, s = !0) {
    this.anchor = t, this.#f = s;
  }
  /**
   * @param {Batch} batch
   */
  #r = (t) => {
    if (this.#t.has(t)) {
      var s = (
        /** @type {Key} */
        this.#t.get(t)
      ), e = this.#s.get(s);
      if (e)
        u(e), this.#i.delete(s);
      else {
        var f = this.#e.get(s);
        f && (this.#s.set(s, f.effect), this.#e.delete(s), f.fragment.lastChild.remove(), this.anchor.before(f.fragment), e = f.effect);
      }
      for (const [i, r] of this.#t) {
        if (this.#t.delete(i), i === t)
          break;
        const c = this.#e.get(r);
        c && (n(c.effect), this.#e.delete(r));
      }
      for (const [i, r] of this.#s) {
        if (i === s || this.#i.has(i)) continue;
        const c = () => {
          if (Array.from(this.#t.values()).includes(i)) {
            var h = document.createDocumentFragment();
            p(r, h), h.append(d()), this.#e.set(i, { effect: r, fragment: h });
          } else
            n(r);
          this.#i.delete(i), this.#s.delete(i);
        };
        this.#f || !e ? (this.#i.add(i), m(r, c, !1)) : c();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #c = (t) => {
    this.#t.delete(t);
    const s = Array.from(this.#t.values());
    for (const [e, f] of this.#e)
      s.includes(e) || (n(f.effect), this.#e.delete(e));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, s) {
    var e = (
      /** @type {Batch} */
      l
    ), f = _();
    if (s && !this.#s.has(t) && !this.#e.has(t))
      if (f) {
        var i = document.createDocumentFragment(), r = d();
        i.append(r), this.#e.set(t, {
          effect: a(() => s(r)),
          fragment: i
        });
      } else
        this.#s.set(
          t,
          a(() => s(this.anchor))
        );
    if (this.#t.set(e, t), f) {
      for (const [c, o] of this.#s)
        c === t ? e.unskip_effect(o) : e.skip_effect(o);
      for (const [c, o] of this.#e)
        c === t ? e.unskip_effect(o.effect) : e.skip_effect(o.effect);
      e.oncommit(this.#r), e.ondiscard(this.#c);
    } else
      this.#r(e);
  }
}
export {
  w as BranchManager
};
