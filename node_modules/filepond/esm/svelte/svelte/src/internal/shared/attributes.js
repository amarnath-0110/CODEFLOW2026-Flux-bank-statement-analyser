import { clsx as S } from "../../../../clsx/dist/clsx.js";
function L(f) {
  return typeof f == "object" ? S(f) : f ?? "";
}
const n = [...` 	
\r\f \v\uFEFF`];
function $(f, t, u) {
  var r = f == null ? "" : "" + f;
  if (u) {
    for (var i of Object.keys(u))
      if (u[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, g = 0; (g = r.indexOf(i, g)) >= 0; ) {
          var c = g + s;
          (g === 0 || n.includes(r[g - 1])) && (c === r.length || n.includes(r[c])) ? r = (g === 0 ? "" : r.substring(0, g)) + r.substring(c + 1) : g = c;
        }
  }
  return r === "" ? null : r;
}
function v(f, t = !1) {
  var u = t ? " !important;" : ";", r = "";
  for (var i of Object.keys(f)) {
    var s = f[i];
    s != null && s !== "" && (r += " " + i + ": " + s + u);
  }
  return r;
}
function j(f) {
  return f[0] !== "-" || f[1] !== "-" ? f.toLowerCase() : f;
}
function q(f, t) {
  if (t) {
    var u = "", r, i;
    if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, f) {
      f = String(f).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var s = !1, g = 0, c = !1, l = [];
      r && l.push(...Object.keys(r).map(j)), i && l.push(...Object.keys(i).map(j));
      var p = 0, b = -1;
      const O = f.length;
      for (var o = 0; o < O; o++) {
        var h = f[o];
        if (c ? h === "/" && f[o - 1] === "*" && (c = !1) : s ? s === h && (s = !1) : h === "/" && f[o + 1] === "*" ? c = !0 : h === '"' || h === "'" ? s = h : h === "(" ? g++ : h === ")" && g--, !c && s === !1 && g === 0) {
          if (h === ":" && b === -1)
            b = o;
          else if (h === ";" || o === O - 1) {
            if (b !== -1) {
              var A = j(f.substring(p, b).trim());
              if (!l.includes(A)) {
                h !== ";" && o++;
                var a = f.substring(p, o).trim();
                u += " " + a + ";";
              }
            }
            p = o + 1, b = -1;
          }
        }
      }
    }
    return r && (u += v(r)), i && (u += v(i, !0)), u = u.trim(), u === "" ? null : u;
  }
  return f == null ? null : String(f);
}
export {
  L as clsx,
  $ as to_class,
  q as to_style
};
