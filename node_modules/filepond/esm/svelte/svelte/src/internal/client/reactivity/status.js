import { CONNECTED as n, CLEAN as o, MAYBE_DIRTY as u } from "../constants.js";
const _ = -7169;
function s(t, f) {
  t.f = t.f & _ | f;
}
function A(t) {
  (t.f & n) !== 0 || t.deps === null ? s(t, o) : s(t, u);
}
export {
  s as set_signal_status,
  A as update_derived_status
};
