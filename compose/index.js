const add = (x) => x + 10;
const multiply = (x) => x * 10;

function compose(...args) {
  return (x) => args.reduceRight((res, cb) => cb(res), x);
}

let calculate = compose(multiply, add);

const res = calculate(10);

console.log(res);
