function quickSort(
  originalArray,
  inputLowIndex = 0,
  inputHighIndex = originalArray.length - 1,
  recursiveCall = false
) {
  const array = recursiveCall ? originalArray : [...originalArray];

  /**
   * partitionArray（）在lowIndex和highIndex之间的子数组上运行。
   * 任意选择子数组中的最后一个元素作为 pivot。将小于pivot的元素放置左侧，大于放置其右侧
   * @param {*} lowIndex
   * @param {*} highIndex
   * @returns
   */
  const partitionArray = (lowIndex, highIndex) => {
    const swap = (leftIndex, rightIndex) => {
      const temp = array[leftIndex];
      array[leftIndex] = array[rightIndex];
      array[rightIndex] = temp;
    };

    const pivot = array[highIndex];
    let partitionIndex = lowIndex;
    for (
      let currentIndex = lowIndex;
      currentIndex < highIndex;
      currentIndex += 1
    ) {
      if (array[currentIndex] < pivot) {
        swap(partitionIndex, currentIndex);
        partitionIndex += 1;
      }
    }
    // console.log(partitionIndex, lowIndex, pivot, array);

    swap(partitionIndex, highIndex);

    return partitionIndex;
  };

  // Base case is when low and high converge.
  if (inputLowIndex < inputHighIndex) {
    const partitionIndex = partitionArray(inputLowIndex, inputHighIndex);
    const RECURSIVE_CALL = true;
    quickSort(array, inputLowIndex, partitionIndex - 1, RECURSIVE_CALL);
    quickSort(array, partitionIndex + 1, inputHighIndex, RECURSIVE_CALL);
  }

  return array;
}

const arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
// console.log();
quickSort(arr, 0, arr.length - 1);
