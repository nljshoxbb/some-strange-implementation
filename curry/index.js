function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry(fn, length) {
  length = length || fn.length;

  var slice = Array.prototype.slice;

  return function () {
    if (arguments.length < length) {
      // 复制参数
      var combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
      return fn.aplly(this, arguments);
    }
  };
}
var fn = curry(function (a, b, c) {
  return [a, b, c];
});
