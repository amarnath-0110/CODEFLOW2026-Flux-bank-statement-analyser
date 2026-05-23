import { listen as t, without_reactive_context as e } from "./shared.js";
function w(i, o) {
  t(window, ["resize"], () => e(() => o(window[i])));
}
export {
  w as bind_window_size
};
