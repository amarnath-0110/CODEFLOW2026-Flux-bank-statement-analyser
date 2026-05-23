function r(a, e, m, l) {
  const n = e ? [a, ...Object.values(e), m] : [a, m];
  createImageBitmap.apply(null, n).then((t) => {
    l(null, t, [t]);
  });
}
r.fileName = "transformImage";
self.onmessage = function (message) {r.apply(null, message.data.concat([function (err, response, transferList = []) {const message = { content: response, error: err };return self.postMessage(message, transferList);},{onprogress: function({ lengthComputable, loaded, total }) {self.postMessage({ type: 'progress', content: { lengthComputable, loaded, total }, error: null })}}]))}