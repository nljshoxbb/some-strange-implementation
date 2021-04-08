function curry(fn, args) {
  var length = fn.length;
  console.log(fn);
  args = args || [];
  return function () {
    var _args = args.slice(0);
    for (var i = 0; i < arguments.length; i++) {
      _args.push(arguments[i]);
    }
    console.log(_args, length);

    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}

var fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});
// fn("a", "b", "c"); // ["a", "b", "c"]
// fn("a", "b")("c"); // ["a", "b", "c"]
// fn("a")("b")("c"); // ["a", "b", "c"]
// fn("a")("b", "c"); // ["a", "b", "c"]

