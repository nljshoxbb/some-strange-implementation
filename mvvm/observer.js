let uid = 0;

// 消息订阅器，维护一个数组，用来收集订阅者，
class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  depend() {
    Dep.target.addDep(this);
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

// Dep对应的watcher
// 监听的属性变化->dep->wathcher->绑定的回调函数触发->更新操作
Dep.target = null;

class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }

  walk(value) {
    Object.keys(value).forEach((key) => this.convert(key, this.value[key]));
  }

  convert(key, val) {
    this.defineReactive(this.value, key, val);
  }

  defineReactive(obj, key, val) {
    const dep = new Dep();
    observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: (newVal) => {
        if (val === newVal) return;
        val = newVal;
        observe(newVal);
        dep.notify();
      },
    });
  }
}

function observe(value) {
  if (!value || typeof value !== "object") {
    return;
  }
  return new Observer(value);
}
