// Need to mock the following methods
// #onload -> event resolving the result, a blobbed file
const fs = require('fs');

class FakeFileReader {
  static toArrayBuffer(buffer) {
    const ab = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return ab;
  }
  constructor(spy) {
    this.listeners = {};
    this.result = {};
    this.spy = spy;
    this.addEventListener('load', () => {
      this.spy.loaded = true;
    });
  }

  dispatchEvent(event) {
    if (!(event.type in this.listeners)) {
      return;
    }
    const stack = this.listeners[event.type];
    event.target = this;
    while (stack.length !== 0) {
      stack.pop().call(this);
    }
  }

  addEventListener(type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  readAsArrayBuffer(filename) {
    fs.readFile(filename, (err, data) => {
      if (err) {
        this.dispatchEvent({ type: 'error' });
      }
      this.result = FakeFileReader.toArrayBuffer(data);
      this.dispatchEvent({ type: 'load' });
    });
  }
}

module.exports = {
  FakeFileReader,
};
