import { untrack as n } from "./internal/client/runtime.js";
import { lifecycle_outside_component as e } from "./internal/shared/errors.js";
import { component_context as r } from "./internal/client/context.js";
import { getContext as _, setContext as y } from "./internal/client/context.js";
import { user_effect as f } from "./internal/client/reactivity/effects.js";
function c(o) {
  r === null && e(), f(() => {
    const t = n(o);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function l(o) {
  r === null && e(), c(() => () => n(o));
}
export {
  _ as getContext,
  l as onDestroy,
  c as onMount,
  y as setContext,
  n as untrack
};
