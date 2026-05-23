import { DIRTY as f, MAYBE_DIRTY as s, CLEAN as t, DERIVED as a, WAS_MARKED as i } from "../constants.js";
import { set_signal_status as u } from "./status.js";
function n(o) {
  if (o !== null)
    for (const r of o)
      (r.f & a) === 0 || (r.f & i) === 0 || (r.f ^= i, n(
        /** @type {Derived} */
        r.deps
      ));
}
function m(o, r, d) {
  (o.f & f) !== 0 ? r.add(o) : (o.f & s) !== 0 && d.add(o), n(o.deps), u(o, t);
}
export {
  m as defer_effect
};
