import { teardown as f } from "../../../reactivity/effects.js";
import { is_array as o } from "../../../../shared/utils.js";
import { select_multiple_invalid_value as s } from "../../../warnings.js";
import { is as a } from "../../../proxy.js";
function l(e, r, u = !1) {
  if (e.multiple) {
    if (r == null)
      return;
    if (!o(r))
      return s();
    for (var t of e.options)
      t.selected = r.includes(i(t));
    return;
  }
  for (t of e.options) {
    var n = i(t);
    if (a(n, r)) {
      t.selected = !0;
      return;
    }
  }
  (!u || r !== void 0) && (e.selectedIndex = -1);
}
function c(e) {
  var r = new MutationObserver(() => {
    l(e, e.__value);
  });
  r.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), f(() => {
    r.disconnect();
  });
}
function i(e) {
  return "__value" in e ? e.__value : e.value;
}
export {
  c as init_select,
  l as select_option
};
