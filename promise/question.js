function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

var light = function (timer, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};

var step = function () {
  Promise.resolve()
    .then(function () {
      return light(3000, red);
    })
    .then(function () {
      return light(2000, green);
    })
    .then(function () {
      return light(1000, yellow);
    })
    .then(function () {
      step();
    });
};

step();
