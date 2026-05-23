function u(t) {
  return t === this.v;
}
function e(t, n) {
  return t != t ? n == n : t !== n || t !== null && typeof t == "object" || typeof t == "function";
}
function o(t) {
  return !e(t, this.v);
}
export {
  u as equals,
  o as safe_equals,
  e as safe_not_equal
};
