function r(n) {
  return n /= 0.5, n < 1 ? 0.5 * n * n : (n--, -0.5 * (n * (n - 2) - 1));
}
export {
  r as quadInOut
};
