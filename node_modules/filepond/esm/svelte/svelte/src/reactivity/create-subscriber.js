import { get as f, untrack as n } from "../internal/client/runtime.js";
import { effect_tracking as c, render_effect as m } from "../internal/client/reactivity/effects.js";
import { source as u, increment as i } from "../internal/client/reactivity/sources.js";
import { queue_micro_task as s } from "../internal/client/dom/task.js";
function d(o) {
  let r = 0, e = u(0), t;
  return () => {
    c() && (f(e), m(() => (r === 0 && (t = n(() => o(() => i(e)))), r += 1, () => {
      s(() => {
        r -= 1, r === 0 && (t?.(), t = void 0, i(e));
      });
    })));
  };
}
export {
  d as createSubscriber
};
