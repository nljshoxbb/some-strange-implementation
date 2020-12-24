class MVVM {
  constructor(options = {}) {
    this.$options = options;
    this._data = this.$options.data;

    const me = this;

    Object.keys(this._data).forEach((key) => {
      me._proxyData(key);
    });
    // this._initComputed();
    observe(this._data);
    //
  }

  _proxyData(key, setter, getter) {
    var me = this;
    setter =
      setter ||
      Object.defineProperty(me, key, {
        configurable: false,
        enumerable: true,
        get: function proxyGetter() {
          return me._data[key];
        },
        set: function proxySetter(newVal) {
          me._data[key] = newVal;
        },
      });
  }

  _initComputed() {
    var me = this;
    var computed = this.$options.computed;
    if (typeof computed === "object") {
      Object.keys(computed).forEach(function (key) {
        Object.defineProperty(me, key, {
          get:
            typeof computed[key] === "function"
              ? computed[key]
              : computed[key].get,
          set: function () {},
        });
      });
    }
  }

  $watch(key, cb, options) {
    new Watcher(this, key, cb);
  }
}
