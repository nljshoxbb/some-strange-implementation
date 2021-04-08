let arr1 = Array.from(new Array(100000), (x, index) => {
  return index;
});

let arr2 = Array.from(new Array(50000), (x, index) => {
  return index + index;
});

let start = new Date().getTime();
console.log("开始数组去重");

function distinct(a, b) {
  let array = a.concat(b);
  return array.filter((item, index) => {
    return array.indexOf(item) == index;
  });
}

console.log("去重后的长度", distinct(arr1, arr2).length);

let end = new Date().getTime();
console.log("耗时", end - start);
