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
const lastSessionValue = new ObservableValue('', 'stringLength', function(value) { this.value = value });

self.addEventListener("connect", (e) => {
  const port = e.ports[0];
  connections.subscribePort(port);
  lastSessionValue.subscribePort(port);
  connections.change();

  port.addEventListener('message', (e) => {
    let totalString = '';

    for(let i = 0; i < e.data.iterationsCount; i++) {
      totalString += i;
    }
    lastSessionValue.change(totalString.length);
  });

  port.start();
}, false);