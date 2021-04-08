class EventEmiiter {
  constructor() {
    this.handlers = {};
  }

  on(eventName, cb) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(cb);
  }

  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }

  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  once(eventName, cb) {
    const wrapper = (...args) => {
      cb.apply(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

const events = new EventEmiiter();

const func = (...args) => {
  console.log("click", ...args);
};

events.on("click", func);

events.emit("click", "这个是参数1", "这个是参数2", 123123213);

events.off("click", func);

events.emit("click", "这个是参数3", "这个是参数4");
