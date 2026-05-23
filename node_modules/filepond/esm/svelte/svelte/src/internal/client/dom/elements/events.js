import { teardown as y } from "../../reactivity/effects.js";
import { define_property as E } from "../../../shared/utils.js";
import { set_active_reaction as _, set_active_effect as g, active_reaction as L, active_effect as S } from "../../runtime.js";
import { queue_micro_task as k } from "../task.js";
import { without_reactive_context as M } from "./bindings/shared.js";
const o = /* @__PURE__ */ Symbol("events"), T = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set();
function x(t, r, i, n = {}) {
  function a(e) {
    if (n.capture || B.call(r, e), !e.cancelBubble)
      return M(() => i?.call(this, e));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? k(() => {
    r.addEventListener(t, a, n);
  }) : r.addEventListener(t, a, n), a;
}
function P(t, r, i, n, a) {
  var e = { capture: n, passive: a }, l = x(t, r, i, e);
  (r === document.body || // @ts-ignore
  r === window || // @ts-ignore
  r === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  r instanceof HTMLMediaElement) && y(() => {
    r.removeEventListener(t, l, e);
  });
}
function j(t, r, i) {
  (r[o] ??= {})[t] = i;
}
function z(t) {
  for (var r = 0; r < t.length; r++)
    T.add(t[r]);
  for (var i of q)
    i(t);
}
let w = null;
function B(t) {
  var r = this, i = (
    /** @type {Node} */
    r.ownerDocument
  ), n = t.type, a = t.composedPath?.() || [], e = (
    /** @type {null | Element} */
    a[0] || t.target
  );
  w = t;
  var l = 0, d = w === t && t[o];
  if (d) {
    var f = a.indexOf(d);
    if (f !== -1 && (r === document || r === /** @type {any} */
    window)) {
      t[o] = r;
      return;
    }
    var p = a.indexOf(r);
    if (p === -1)
      return;
    f <= p && (l = f);
  }
  if (e = /** @type {Element} */
  a[l] || t.target, e !== r) {
    E(t, "currentTarget", {
      configurable: !0,
      get() {
        return e || i;
      }
    });
    var b = L, m = S;
    _(null), g(null);
    try {
      for (var c, h = []; e !== null; ) {
        var s = e.assignedSlot || e.parentNode || /** @type {any} */
        e.host || null;
        try {
          var v = e[o]?.[n];
          v != null && (!/** @type {any} */
          e.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === e) && v.call(e, t);
        } catch (u) {
          c ? h.push(u) : c = u;
        }
        if (t.cancelBubble || s === r || s === null)
          break;
        e = s;
      }
      if (c) {
        for (let u of h)
          queueMicrotask(() => {
            throw u;
          });
        throw c;
      }
    } finally {
      t[o] = r, delete t.currentTarget, _(b), g(m);
    }
  }
}
export {
  T as all_registered_events,
  x as create_event,
  z as delegate,
  j as delegated,
  P as event,
  o as event_symbol,
  B as handle_event_propagation,
  q as root_event_handles
};
