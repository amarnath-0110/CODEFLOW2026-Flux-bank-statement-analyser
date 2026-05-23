import { BOUNDARY_EFFECT as g, EFFECT_TRANSPARENT as E, EFFECT_PRESERVED as k } from "../../constants.js";
import { set_component_context as v, component_context as F } from "../../context.js";
import { handle_error as x, invoke_error_boundary as _ } from "../../error-handling.js";
import { block as R, branch as h, pause_effect as l, move_effect as S, destroy_effect as p } from "../../reactivity/effects.js";
import { active_effect as c, set_active_effect as y, set_active_reaction as b, active_reaction as T, get as w } from "../../runtime.js";
import { svelte_boundary_reset_noop as D } from "../../warnings.js";
import { create_text as A } from "../operations.js";
import { queue_micro_task as u } from "../task.js";
import { svelte_boundary_reset_onerror as B } from "../../errors.js";
import { current_batch as f, Batch as C } from "../../reactivity/batch.js";
import { internal_set as N, source as q } from "../../reactivity/sources.js";
import { createSubscriber as P } from "../../../../reactivity/create-subscriber.js";
import { defer_effect as j } from "../../reactivity/utils.js";
var O = E | k;
function Z(d, t, e, i) {
  new U(d, t, e, i);
}
class U {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /**
   * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
   * Inherited from parent boundary, or defaults to identity.
   * @type {(error: unknown) => unknown}
   */
  transform_error;
  /** @type {TemplateNode} */
  #r;
  /** @type {TemplateNode | null} */
  #b = null;
  /** @type {BoundaryProps} */
  #s;
  /** @type {((anchor: Node) => void)} */
  #a;
  /** @type {Effect} */
  #e;
  /** @type {Effect | null} */
  #n = null;
  /** @type {Effect | null} */
  #t = null;
  /** @type {Effect | null} */
  #i = null;
  /** @type {DocumentFragment | null} */
  #h = null;
  #_ = 0;
  #o = 0;
  #c = !1;
  /** @type {Set<Effect>} */
  #u = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #d = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #f = null;
  #y = P(() => (this.#f = q(this.#_), () => {
    this.#f = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, e, i, o) {
    this.#r = t, this.#s = e, this.#a = (s) => {
      var a = (
        /** @type {Effect} */
        c
      );
      a.b = this, a.f |= g, i(s);
    }, this.parent = /** @type {Effect} */
    c.b, this.transform_error = o ?? this.parent?.transform_error ?? ((s) => s), this.#e = R(() => {
      this.#m();
    }, O);
  }
  #E() {
    try {
      this.#n = h(() => this.#a(this.#r));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #k(t) {
    const e = this.#s.failed;
    e && (this.#i = h(() => {
      e(
        this.#r,
        () => t,
        () => () => {
        }
      );
    }));
  }
  #F() {
    const t = this.#s.pending;
    t && (this.is_pending = !0, this.#t = h(() => t(this.#r)), u(() => {
      var e = this.#h = document.createDocumentFragment(), i = A();
      e.append(i), this.#n = this.#p(() => h(() => this.#a(i))), this.#o === 0 && (this.#r.before(e), this.#h = null, l(
        /** @type {Effect} */
        this.#t,
        () => {
          this.#t = null;
        }
      ), this.#l(
        /** @type {Batch} */
        f
      ));
    }));
  }
  #m() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#o = 0, this.#_ = 0, this.#n = h(() => {
        this.#a(this.#r);
      }), this.#o > 0) {
        var t = this.#h = document.createDocumentFragment();
        S(this.#n, t);
        const e = (
          /** @type {(anchor: Node) => void} */
          this.#s.pending
        );
        this.#t = h(() => e(this.#r));
      } else
        this.#l(
          /** @type {Batch} */
          f
        );
    } catch (e) {
      this.error(e);
    }
  }
  /**
   * @param {Batch} batch
   */
  #l(t) {
    this.is_pending = !1, t.transfer_effects(this.#u, this.#d);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    j(t, this.#u, this.#d);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#s.pending;
  }
  /**
   * @template T
   * @param {() => T} fn
   */
  #p(t) {
    var e = c, i = T, o = F;
    y(this.#e), b(this.#e), v(this.#e.ctx);
    try {
      return C.ensure(), t();
    } catch (s) {
      return x(s), null;
    } finally {
      y(e), b(i), v(o);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #g(t, e) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#g(t, e);
      return;
    }
    this.#o += t, this.#o === 0 && (this.#l(e), this.#t && l(this.#t, () => {
      this.#t = null;
    }), this.#h && (this.#r.before(this.#h), this.#h = null));
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, e) {
    this.#g(t, e), this.#_ += t, !(!this.#f || this.#c) && (this.#c = !0, u(() => {
      this.#c = !1, this.#f && N(this.#f, this.#_);
    }));
  }
  get_effect_pending() {
    return this.#y(), w(
      /** @type {Source<number>} */
      this.#f
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!this.#s.onerror && !this.#s.failed)
      throw t;
    f?.is_fork ? (this.#n && f.skip_effect(this.#n), this.#t && f.skip_effect(this.#t), this.#i && f.skip_effect(this.#i), f.on_fork_commit(() => {
      this.#v(t);
    })) : this.#v(t);
  }
  /**
   * @param {unknown} error
   */
  #v(t) {
    this.#n && (p(this.#n), this.#n = null), this.#t && (p(this.#t), this.#t = null), this.#i && (p(this.#i), this.#i = null);
    var e = this.#s.onerror;
    let i = this.#s.failed;
    var o = !1, s = !1;
    const a = () => {
      if (o) {
        D();
        return;
      }
      o = !0, s && B(), this.#i !== null && l(this.#i, () => {
        this.#i = null;
      }), this.#p(() => {
        this.#m();
      });
    }, m = (n) => {
      try {
        s = !0, e?.(n, a), s = !1;
      } catch (r) {
        _(r, this.#e && this.#e.parent);
      }
      i && (this.#i = this.#p(() => {
        try {
          return h(() => {
            var r = (
              /** @type {Effect} */
              c
            );
            r.b = this, r.f |= g, i(
              this.#r,
              () => n,
              () => a
            );
          });
        } catch (r) {
          return _(
            r,
            /** @type {Effect} */
            this.#e.parent
          ), null;
        }
      }));
    };
    u(() => {
      var n;
      try {
        n = this.transform_error(t);
      } catch (r) {
        _(r, this.#e && this.#e.parent);
        return;
      }
      n !== null && typeof n == "object" && typeof /** @type {any} */
      n.then == "function" ? n.then(
        m,
        /** @param {unknown} e */
        (r) => _(r, this.#e && this.#e.parent)
      ) : m(n);
    });
  }
}
export {
  U as Boundary,
  Z as boundary
};
