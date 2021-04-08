class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener, isUnshift) {
    if (!this.events) {
      this.events = {};
    }

    if (this.events[type]) {
      if (isUnshift) {
        this.events[type].unshift(listener);
      } else {
        this.events[type].push(listener);
      }
    } else {
      this.events[type] = [listener];
    }

    if (type !== "newListener") {
      // node的EventEmitter模块自带的特殊事件，该事件在添加新事件监听器的时候触发
      this.emit("newListener", type);
    }
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((fn) => fn.call(this, ...args));
    }
  }

  once(type, listener) {
    const _this = this;
    function oneTime(...args) {
      listener.call(this, ...args);
      _this.off(type, oneTime);
    }
    _this.on(type, oneTime);
  }

  off(type, listener) {
    if (this.events[type]) {
      const index = this.events[type].indexOf(listener);
      this.events[type].splice(index, 1);
    }
  }
}

// 运行示例
let event1 = new EventEmitter();

function say1(str) {
  console.log(str);
}

function say2(str) {
  console.log(`${str}+++`);
}

event1.on("say", say1);

event1.on("say", say2);

event1.off("say", say1);
event1.off("say", say2);

event1.once("say", function (str) {
  console.log("这是once:" + str);
});

event1.emit("say", "visa");
event1.emit("say", "visa222");
event1.emit("say", "visa333");
