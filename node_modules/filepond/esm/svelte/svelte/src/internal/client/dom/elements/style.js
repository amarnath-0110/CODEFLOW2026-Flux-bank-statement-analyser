import { to_style as A } from "../../../shared/attributes.js";
import { STYLE_CACHE as u } from "../../constants.js";
function a(r, p = {}, f, i) {
  for (var o in f) {
    var t = f[o];
    p[o] !== t && (f[o] == null ? r.style.removeProperty(o) : r.style.setProperty(o, t, i));
  }
}
function e(r, p, f, i) {
  var o = (
    /** @type {any} */
    r[u]
  );
  if (o !== p) {
    var t = A(p, i);
    t == null ? r.removeAttribute("style") : r.style.cssText = t, r[u] = p;
  } else i && (Array.isArray(i) ? (a(r, f?.[0], i[0]), a(r, f?.[1], i[1], "important")) : a(r, f, i));
  return i;
}
export {
  e as set_style
};
