import { is_function as L, noop as l } from "../../../shared/utils.js";
import { effect as S } from "../../reactivity/effects.js";
import { active_effect as x, untrack as B } from "../../runtime.js";
import { loop as M } from "../../loop.js";
import { should_intro as j } from "../../render.js";
import { TRANSITION_GLOBAL as q } from "../../../../constants.js";
import { EFFECT_TRANSPARENT as G, BLOCK_EFFECT as K, REACTION_RAN as P } from "../../constants.js";
import { queue_micro_task as U } from "../task.js";
import { without_reactive_context as I } from "./bindings/shared.js";
function y(t, r) {
  I(() => {
    t.dispatchEvent(new CustomEvent(r));
  });
}
function W(t) {
  if (t === "float") return "cssFloat";
  if (t === "offset") return "cssOffset";
  if (t.startsWith("--")) return t;
  const r = t.split("-");
  return r.length === 1 ? r[0] : r[0] + r.slice(1).map(
    /** @param {any} word */
    (i) => i[0].toUpperCase() + i.slice(1)
  ).join("");
}
function k(t) {
  const r = {}, i = t.split(";");
  for (const a of i) {
    const [e, n] = a.split(":");
    if (!e || n === void 0) break;
    const v = W(e.trim());
    r[v] = n.trim();
  }
  return r;
}
const z = (t) => t;
function rr(t, r, i, a) {
  var e = (t & q) !== 0, n = "both", v, c = r.inert, w = r.style.overflow, p, u;
  function s() {
    return I(() => v ??= i()(r, a?.() ?? /** @type {P} */
    {}, {
      direction: n
    }));
  }
  var m = {
    is_global: e,
    in() {
      r.inert = c, p = N(
        r,
        s(),
        u,
        1,
        () => {
          y(r, "introstart");
        },
        () => {
          y(r, "introend"), p?.abort(), p = v = void 0, r.style.overflow = w;
        }
      );
    },
    out(f) {
      r.inert = !0, u = N(
        r,
        s(),
        p,
        0,
        () => {
          y(r, "outrostart");
        },
        () => {
          y(r, "outroend"), f?.();
        }
      );
    },
    stop: () => {
      p?.abort(), u?.abort();
    }
  }, _ = (
    /** @type {Effect & { nodes: EffectNodes }} */
    x
  );
  if ((_.nodes.t ??= []).push(m), j) {
    var d = e;
    if (!d) {
      for (var o = (
        /** @type {Effect | null} */
        _.parent
      ); o && (o.f & G) !== 0; )
        for (; (o = o.parent) && (o.f & K) === 0; )
          ;
      d = !o || (o.f & P) !== 0;
    }
    d && S(() => {
      B(() => m.in());
    });
  }
}
function N(t, r, i, a, e, n) {
  var v = a === 1;
  if (L(r)) {
    var c, w = !1;
    return U(() => {
      if (!w) {
        var h = r({ direction: v ? "in" : "out" });
        c = N(t, h, i, a, e, n);
      }
    }), {
      abort: () => {
        w = !0, c?.abort();
      },
      deactivate: () => c.deactivate(),
      reset: () => c.reset(),
      t: () => c.t()
    };
  }
  if (i?.deactivate(), !r?.duration && !r?.delay)
    return e(), n(), {
      abort: l,
      deactivate: l,
      reset: l,
      t: () => a
    };
  const { delay: p = 0, css: u, tick: s, easing: m = z } = r;
  var _ = [];
  if (v && i === void 0 && (s && s(0, 1), u)) {
    var d = k(u(0, 1));
    _.push(d, d);
  }
  var o = () => 1 - a, f = t.animate(_, { duration: p, fill: "forwards" });
  return f.onfinish = () => {
    f.cancel(), e();
    var h = i?.t() ?? 1 - a;
    i?.abort();
    var A = a - h, E = (
      /** @type {number} */
      r.duration * Math.abs(A)
    ), F = [];
    if (E > 0) {
      var O = !1;
      if (u)
        for (var R = Math.ceil(E / 16.666666666666668), C = 0; C <= R; C += 1) {
          var b = h + A * m(C / R), g = k(u(b, 1 - b));
          F.push(g), O ||= g.overflow === "hidden";
        }
      O && (t.style.overflow = "hidden"), o = () => {
        var T = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          f.currentTime
        );
        return h + A * m(T / E);
      }, s && M(() => {
        if (f.playState !== "running") return !1;
        var T = o();
        return s(T, 1 - T), !0;
      });
    }
    f = t.animate(F, { duration: E, fill: "forwards" }), f.onfinish = () => {
      o = () => a, s?.(a, 1 - a), n();
    };
  }, {
    abort: () => {
      f && (f.cancel(), f.effect = null, f.onfinish = l);
    },
    deactivate: () => {
      n = l;
    },
    reset: () => {
      a === 0 && s?.(1, 0);
    },
    t: () => o()
  };
}
export {
  rr as transition
};
