import { run_all as i } from "../../shared/utils.js";
let r = [];
function o() {
  var t = r;
  r = [], i(t);
}
function a(t) {
  if (r.length === 0) {
    var u = r;
    queueMicrotask(() => {
      u === r && o();
    });
  }
  r.push(t);
}
export {
  a as queue_micro_task
};
