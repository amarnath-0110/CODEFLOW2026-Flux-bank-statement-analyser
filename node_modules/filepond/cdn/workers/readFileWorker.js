function d(a, r, { onprogress: n }) {
  const e = new FileReader();
  e.onprogress = n, e.onloadend = () => r(null, { dataURL: e.result }), e.onerror = (o) => r(o), e.readAsDataURL(a);
}
d.fileName = "readFile";
self.onmessage = function (message) {d.apply(null, message.data.concat([function (err, response, transferList = []) {const message = { content: response, error: err };return self.postMessage(message, transferList);},{onprogress: function({ lengthComputable, loaded, total }) {self.postMessage({ type: 'progress', content: { lengthComputable, loaded, total }, error: null })}}]))}