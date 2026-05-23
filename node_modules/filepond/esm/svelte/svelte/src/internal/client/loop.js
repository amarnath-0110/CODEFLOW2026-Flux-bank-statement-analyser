import { raf as s } from "./timing.js";
function o() {
  const e = s.now();
  s.tasks.forEach((t) => {
    t.c(e) || (s.tasks.delete(t), t.f());
  }), s.tasks.size !== 0 && s.tick(o);
}
function a(e) {
  let t;
  return s.tasks.size === 0 && s.tick(o), {
    promise: new Promise((i) => {
      s.tasks.add(t = { c: e, f: i });
    }),
    abort() {
      s.tasks.delete(t);
    }
  };
}
export {
  a as loop
};
