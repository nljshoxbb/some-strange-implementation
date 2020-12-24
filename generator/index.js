// @ts-nocheck
var fetch = require("node-fetch");

function* gen() {
  var r1 = yield fetch("https://api.github.com/users/github");
  var json1 = yield r1.json();
  var r2 = yield fetch("https://api.github.com/users/github/followers");
  var json2 = yield r2.json();
  var r3 = yield fetch("https://api.github.com/users/github/repos");
  var json3 = yield r3.json();

  console.log([json1.bio, json2[0].login, json3[0].full_name].join("\n"));
}

function run(paramsGen) {
  var g = paramsGen();

  function next(data) {
    var result = g.next(data);
    if (result.done) {
      return;
    }

    if (isPromise(result.value)) {
      result.value.then((data) => {
        next(data);
      });
    } else {
      result.value(next);
    }
  }
  next();
}

function isPromise(obj) {
  return "function" === typeof obj.then;
}

run(gen);
