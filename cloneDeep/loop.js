// 破解递归爆栈

function cloneLoop(x) {
  const root = {};

  const loopList = [{ parent: root, key: undefined, data: x }];

  while (loopList.length) {
    // 深度优先遍历
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let res = parent;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    for (let i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        if (typeof data[i] === "object") {
          loopList.push({ parent: res, key: i, data: data[i] });
        } else {
          res[i] = data[i];
        }
      }
    }
  }
  return root;
}
