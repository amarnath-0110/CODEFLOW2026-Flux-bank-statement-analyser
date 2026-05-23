function b({
  url: c,
  method: a = "GET",
  formData: d,
  data: i,
  headers: l = [],
  timeout: E = 0,
  withCredentials: q = !1,
  responseType: R = "text"
}, n, { onprogress: T, signal: o }) {
  if (o?.aborted) {
    n(o.reason);
    return;
  }
  function f() {
    e.abort();
  }
  o?.addEventListener("abort", f, { once: !0 });
  function r() {
    o?.removeEventListener("abort", f);
  }
  function u() {
    n(e.status + " (" + e.statusText + ")");
  }
  function h() {
    const t = {
      response: e.response,
      responseHeaders: e.getAllResponseHeaders()
    };
    n(null, t, typeof t.response != "string" ? [t.response] : void 0);
  }
  function H(t) {
    const s = new FormData();
    return t.filter(Boolean).forEach((v) => {
      s.append(...v);
    }), s;
  }
  const e = new XMLHttpRequest();
  e.responseType = R;
  const p = i || (d ? H(d) : null);
  (p ? e.upload : e).onprogress = T, e.onload = () => {
    r(), e.status >= 200 && e.status < 300 ? h() : u();
  }, e.onerror = () => {
    r(), u();
  }, e.ontimeout = () => {
    r(), u();
  }, e.onabort = () => {
    r(), n(o?.reason);
  }, e.open(p && (a === "GET" || a === "HEAD") ? "POST" : a, c), e.withCredentials = q, e.timeout = E, l.forEach(([t, s]) => e.setRequestHeader(t, s)), e.send(p);
}
b.fileName = "httpRequest";
self.onmessage = function (message) {b.apply(null, message.data.concat([function (err, response, transferList = []) {const message = { content: response, error: err };return self.postMessage(message, transferList);},{onprogress: function({ lengthComputable, loaded, total }) {self.postMessage({ type: 'progress', content: { lengthComputable, loaded, total }, error: null })}}]))}