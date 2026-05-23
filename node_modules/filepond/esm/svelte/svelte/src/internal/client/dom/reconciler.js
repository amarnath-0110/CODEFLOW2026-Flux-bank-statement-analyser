import { create_element as r } from "./operations.js";
const n = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function l(e) {
  return (
    /** @type {string} */
    n?.createHTML(e) ?? e
  );
}
function c(e) {
  var t = r("template");
  return t.innerHTML = l(e.replaceAll("<!>", "<!---->")), t.content;
}
export {
  c as create_fragment_from_html,
  l as create_trusted_html
};
