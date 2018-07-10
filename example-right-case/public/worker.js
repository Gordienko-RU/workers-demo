self.addEventListener('message', (e) => {
  const arr = [];
  console.log(e);
  for(let i = 0; i < e.data.iterationsCount; i++) {
    arr.push(new Date());
  }

  self.postMessage({ successfully: true });
});