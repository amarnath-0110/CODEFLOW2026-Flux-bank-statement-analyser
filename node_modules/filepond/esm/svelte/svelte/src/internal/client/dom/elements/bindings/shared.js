import { teardown as v } from "../../../reactivity/effects.js";
import { set_active_reaction as i, set_active_effect as o, active_effect as a, active_reaction as _ } from "../../../runtime.js";
function l(t, r, e, f = !0) {
  f && e();
  for (var n of r)
    t.addEventListener(n, e);
  v(() => {
    for (var c of r)
      t.removeEventListener(c, e);
  });
}
function m(t) {
  var r = _, e = a;
  i(null), o(null);
  try {
    return t();
  } finally {
    i(r), o(e);
  }
}
export {
  l as listen,
  m as without_reactive_context
};
