import { ERROR_VALUE as r, REACTION_RAN as t, EFFECT as a, BOUNDARY_EFFECT as _ } from "./constants.js";
import { active_reaction as f, active_effect as u } from "./runtime.js";
function R(n) {
  var i = u;
  if (i === null)
    return f.f |= r, n;
  if ((i.f & t) === 0 && (i.f & a) === 0)
    throw n;
  E(n, i);
}
function E(n, i) {
  for (; i !== null; ) {
    if ((i.f & _) !== 0) {
      if ((i.f & t) === 0)
        throw n;
      try {
        i.b.error(n);
        return;
      } catch (o) {
        n = o;
      }
    }
    i = i.parent;
  }
  throw n;
}
export {
  R as handle_error,
  E as invoke_error_boundary
};
