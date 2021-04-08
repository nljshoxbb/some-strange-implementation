function bubbleSort(array) {
  for (let j = 0; j < array.length; j++) {
    let complete = true;
    for (let i = 0; i < array.length - 1 - j; i++) {
      // 表叫相邻数
      if (array[i] > array[i + 1]) {
        // 交换？
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        complete = false;
      }
    }
    // 没有冒泡结束循环
    if (complete) {
      break;
    }
  }
  return array;
}

const array = [1, 10, 5, 6, 8, 3];
console.log(bubbleSort(array));
