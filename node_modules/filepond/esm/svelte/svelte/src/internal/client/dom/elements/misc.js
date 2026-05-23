import { queue_micro_task as c } from "../task.js";
function f(o, t) {
  if (t) {
    const u = document.body;
    o.autofocus = !0, c(() => {
      document.activeElement === u && o.focus();
    });
  }
}
export {
  f as autofocus
};
