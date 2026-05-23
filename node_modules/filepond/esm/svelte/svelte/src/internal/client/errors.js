function n() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function o(e, t, r) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function _(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function d() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function s(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function f() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function i(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function v() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function a() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function p() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function h() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
export {
  n as async_derived_orphan,
  o as each_key_duplicate,
  _ as effect_in_teardown,
  d as effect_in_unowned_derived,
  s as effect_orphan,
  f as effect_update_depth_exceeded,
  i as props_invalid_value,
  v as state_descriptors_fixed,
  a as state_prototype_fixed,
  p as state_unsafe_mutation,
  h as svelte_boundary_reset_onerror
};
