// function createIterator(items) {
//   var i = 0;
//   return {
//     next: function () {
//       var done = i >= items.length;
//       var value = !done ? items[i++] : undefined;
//       return {
//         done: done,
//         value: value,
//       };
//     },
//   };
// }

// var iterator = createIterator([1, 2, 3]);

function* createIterator(items) {
  var total = 0;
  for (let i = 0; i < items.length; i++) {
    var a = yield items[i];
    total += a;
  }
  return total;
}

const iterator = createIterator([1, 2, 3]);

console.log(
  iterator.next(),
  iterator.next(1),
  iterator.next(2),
  iterator.next(),
  iterator.next(3)
);
