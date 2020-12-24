// @ts-nocheck

function Promise(executor) {
  var self = this;
  self.status = "pending";
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    if (self.status === "pending") {
      self.status = "resolved";
      self.data = value;
      for (var i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value);
      }
    }
  }

  function reject(reason) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.data = reason;
      for (var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason);
      }
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;

  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise !"));
  }

  if (x instanceof Promise) {
    if (x.status === "pending") {
      x.then(function (value) {
        resolvePromise(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }

  if (x !== null && (typeof x === "object" || typeof x === "function")) {

    try {
        then = x.then;
        if(typeof then === 'function'){
            then.call(x,function rs(y){
                
            })
        }
    } catch (error) {
        
    }
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2;

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (v) {
          return v;
        };
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (r) {
          return r;
        };

  if (self.status === "resolved") {
    return (promise2 = new Promise(function (resolve, reject) {
      try {
        var x = onResolved(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
      } catch (error) {
        reject(error);
      }
    }));
  }

  if (self.status === "rejected") {
    return (promise2 = new Promise(function (resolve, reject) {
      try {
        var x = onRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
      } catch (error) {
        reject(error);
      }
    }));
  }

  if (self.status === "pending") {
    return (promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      });

      self.onRejectedCallback.push(function (value) {
        try {
          var x = onRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      });
    }));
  }
};

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

var p = new Promise((resolve) => {
  setTimeout(resolve, 2000, "hi");
});
p.then(() => {
  console.log(1);
});
p.then(() => {
  console.log(2);
});

p.then(() => {
  console.log(3);
});
