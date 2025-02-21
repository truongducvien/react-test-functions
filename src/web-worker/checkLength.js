self.onmessage = (e) => {
  self.postMessage({ length: 10, name: e?.data?.name });
};
