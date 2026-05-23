import { get as m, active_effect as E, update_version as x, set_active_reaction as D, set_update_version as N, active_reaction as K } from "./runtime.js";
import { object_prototype as L, array_prototype as M, get_descriptor as P, get_prototype_of as S, is_array as B } from "../shared/utils.js";
import { state as v, set as l, increment as O } from "./reactivity/sources.js";
import { STATE_SYMBOL as _ } from "./constants.js";
import { UNINITIALIZED as u } from "../../constants.js";
import { state_prototype_fixed as U, state_descriptors_fixed as Y } from "./errors.js";
function b(f) {
  if (typeof f != "object" || f === null || _ in f)
    return f;
  const y = S(f);
  if (y !== L && y !== M)
    return f;
  var s = /* @__PURE__ */ new Map(), w = B(f), g = v(0), I = x, d = (t) => {
    if (x === I)
      return t();
    var e = K, r = x;
    D(null), N(I);
    var n = t();
    return D(e), N(r), n;
  };
  return w && s.set("length", v(
    /** @type {any[]} */
    f.length
  )), new Proxy(
    /** @type {any} */
    f,
    {
      defineProperty(t, e, r) {
        (!("value" in r) || r.configurable === !1 || r.enumerable === !1 || r.writable === !1) && Y();
        var n = s.get(e);
        return n === void 0 ? d(() => {
          var i = v(r.value);
          return s.set(e, i), i;
        }) : l(n, r.value, !0), !0;
      },
      deleteProperty(t, e) {
        var r = s.get(e);
        if (r === void 0) {
          if (e in t) {
            const n = d(() => v(u));
            s.set(e, n), O(g);
          }
        } else
          l(r, u), O(g);
        return !0;
      },
      get(t, e, r) {
        if (e === _)
          return f;
        var n = s.get(e), i = e in t;
        if (n === void 0 && (!i || P(t, e)?.writable) && (n = d(() => {
          var o = b(i ? t[e] : u), c = v(o);
          return c;
        }), s.set(e, n)), n !== void 0) {
          var a = m(n);
          return a === u ? void 0 : a;
        }
        return Reflect.get(t, e, r);
      },
      getOwnPropertyDescriptor(t, e) {
        var r = Reflect.getOwnPropertyDescriptor(t, e);
        if (r && "value" in r) {
          var n = s.get(e);
          n && (r.value = m(n));
        } else if (r === void 0) {
          var i = s.get(e), a = i?.v;
          if (i !== void 0 && a !== u)
            return {
              enumerable: !0,
              configurable: !0,
              value: a,
              writable: !0
            };
        }
        return r;
      },
      has(t, e) {
        if (e === _)
          return !0;
        var r = s.get(e), n = r !== void 0 && r.v !== u || Reflect.has(t, e);
        if (r !== void 0 || E !== null && (!n || P(t, e)?.writable)) {
          r === void 0 && (r = d(() => {
            var a = n ? b(t[e]) : u, o = v(a);
            return o;
          }), s.set(e, r));
          var i = m(r);
          if (i === u)
            return !1;
        }
        return n;
      },
      set(t, e, r, n) {
        var i = s.get(e), a = e in t;
        if (w && e === "length")
          for (var o = r; o < /** @type {Source<number>} */
          i.v; o += 1) {
            var c = s.get(o + "");
            c !== void 0 ? l(c, u) : o in t && (c = d(() => v(u)), s.set(o + "", c));
          }
        if (i === void 0)
          (!a || P(t, e)?.writable) && (i = d(() => v(void 0)), l(i, b(r)), s.set(e, i));
        else {
          a = i.v !== u;
          var A = d(() => b(r));
          l(i, A);
        }
        var R = Reflect.getOwnPropertyDescriptor(t, e);
        if (R?.set && R.set.call(n, r), !a) {
          if (w && typeof e == "string") {
            var j = (
              /** @type {Source<number>} */
              s.get("length")
            ), h = Number(e);
            Number.isInteger(h) && h >= j.v && l(j, h + 1);
          }
          O(g);
        }
        return !0;
      },
      ownKeys(t) {
        m(g);
        var e = Reflect.ownKeys(t).filter((i) => {
          var a = s.get(i);
          return a === void 0 || a.v !== u;
        });
        for (var [r, n] of s)
          n.v !== u && !(r in t) && e.push(r);
        return e;
      },
      setPrototypeOf() {
        U();
      }
    }
  );
}
function T(f) {
  try {
    if (f !== null && typeof f == "object" && _ in f)
      return f[_];
  } catch {
  }
  return f;
}
function G(f, y) {
  return Object.is(T(f), T(y));
}
export {
  T as get_proxied_value,
  G as is,
  b as proxy
};
