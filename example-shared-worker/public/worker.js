class ObservableValue {
  constructor(value, key, changeHandler) {
    this.value = value;
    this.key = key;
    this.changeHandler = changeHandler.bind(this);
    this.ports = [];
  }

  subscribePort(port) {
    this.ports.push(port);
  }

  broadcast() {
    const payload = {};
    payload[this.key] = this.value;
    this.ports.forEach((port) => port.postMessage(payload));
  }

  change(value) {
    this.changeHandler(value);
    this.broadcast();
  }
}

const connections = new ObservableValue(0, 'connections', function() { this.value++ });
// let totalString = '';

self.addEventListener("connect", (e) => {
  const port = e.ports[0];
  connections.subscribePort(port);
  connections.change();

  // if (totalString) {
  //   port.postMessage({ lastSessionValue: totalString });
  // }

  // port.addEventListener('message', (e) => {
  //   for(let i = 0; i < e.data.iterationsCount; i++) {
  //     totalString += i;
  //   }
  //   port.postMessage({ stringLength: totalString.length });
  // });

	port.start();
}, false);