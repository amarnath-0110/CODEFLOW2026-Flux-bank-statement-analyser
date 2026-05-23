var a = Array.isArray, n = Array.prototype.indexOf, i = Array.prototype.includes, y = Array.from, c = Object.defineProperty, s = Object.getOwnPropertyDescriptor, f = Object.getOwnPropertyDescriptors, v = Object.prototype, _ = Array.prototype, d = Object.getPrototypeOf, u = Object.isExtensible;
function O(r) {
  return typeof r == "function";
}
const b = () => {
};
function j(r) {
  for (var e = 0; e < r.length; e++)
    r[e]();
}
function l() {
  var r, e, t = new Promise((o, p) => {
    r = o, e = p;
  });
  return { promise: t, resolve: r, reject: e };
}
export {
  y as array_from,
  _ as array_prototype,
  l as deferred,
  c as define_property,
  s as get_descriptor,
  f as get_descriptors,
  d as get_prototype_of,
  i as includes,
  n as index_of,
  a as is_array,
  u as is_extensible,
  O as is_function,
  b as noop,
  v as object_prototype,
  j as run_all
};
