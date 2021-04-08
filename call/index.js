// Function.prototype.call2 = function (context) {
//   var context = context || global;
//   context.fn = this;

//   var args = [];

//   for (var i = 1, len = arguments.length; i < len; i++) {
//     args.push("arguments[" + i + "]");
//   }

//   var result = eval("context.fn(" + args + ")");
//   console.log("context.fn(" + args + ")", context.fn(args));

//   delete context.fn;
//   return result;
// };

Function.prototype.myCall = function (context = global, ...args) {
  if (this === Function.prototype) {
    return undefined; // 防止Function.prototype.myCall()直接调用
  }
  context = context || global;
  const fn = Symbol();
  context[fn] = this; // 这里的this是调用者 也就是函数

  console.log(this, context);
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

var value = 2;

var obj = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}

// bar.myCall(null); // 2

console.log(bar.myCall(obj, "kevin", 18));
