// // 由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
// // V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。
// // 从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
// function* dataConsumer() {
//   console.log("Started");
//   console.log(`1. ${yield}`);
//   console.log(`2. ${yield}`);
//   return "result";
// }

// let genObj = dataConsumer();
// genObj.next();
// // Started
// genObj.next("a");
// // 1. a
// genObj.next("b");
// 2. b

function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    // generatorObject.next();
    generatorObject.a = 1;
    console.log(generatorObject);
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return "DONE";
});
const a = wrapped("123");
a.next();
a.next("input");
