var a = {
  name: "muyiy",
  book: {
    title: "You Don't Know JS",
    price: "45",
  },
  a1: undefined,
  a2: null,
  a3: 123,
  a4: [1, 2, 3, 4],
  a5: function () {
    return "a5!!!";
  },
};

a.circle = a;

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

function cloneDeep(source, hash = new WeakMap()) {
  if (!isObject(source)) {
    return source;
  }
  // 解决循环引用问题
  if (hash.has(source)) {
    return hash.get(source);
  }

  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  // 解决拷贝symbol问题
  let symKeys = Object.getOwnPropertySymbols(source);
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      if (isObject(source[symKey])) {
        target[symKey] = cloneDeep(source[symKey], hash);
      } else {
        target[symKey] = source[symKey];
      }
    });
  }

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key], hash);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

function find(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }
  return null;
}

function cloneDeep1(source, uniqueList) {
  if (!isObject(source)) {
    return source;
  }

  if (!uniqueList) {
    uniqueList = [];
  }

  var target = Array.isArray(source) ? [] : {};

  var uniqueData = find(uniqueList, source);

  if (uniqueData) {
    return uniqueData.target;
  }

  uniqueList.push({ source, target });
}

// var b = cloneDeep(a);
// console.log(b);
// b.a4[3] = 100;
// b.book.price = 80;
// b.a5 = function () {
//   return "b-a5!!!";
// };

var sym1 = Symbol("a"); // 创建新的symbol类型
var sym2 = Symbol.for("b"); // 从全局的symbol注册?表设置和取得symbol

a[sym1] = "localSymbol";
a[sym2] = "globalSymbol";

var b = cloneDeep(a);
console.log(b);
