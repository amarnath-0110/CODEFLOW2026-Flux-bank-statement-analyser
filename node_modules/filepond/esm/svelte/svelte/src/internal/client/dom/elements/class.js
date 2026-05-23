import { to_class as v } from "../../../shared/attributes.js";
import { CLASS_CACHE as C } from "../../constants.js";
function p(r, b, f, g, t, i) {
  var A = (
    /** @type {any} */
    r[C]
  );
  if (A !== f || A === void 0) {
    var o = v(f, g, i);
    o == null ? r.removeAttribute("class") : b ? r.className = o : r.setAttribute("class", o), r[C] = f;
  } else if (i && t !== i)
    for (var u in i) {
      var l = !!i[u];
      (t == null || l !== !!t[u]) && r.classList.toggle(u, l);
    }
  return i;
}
export {
  p as set_class
};
