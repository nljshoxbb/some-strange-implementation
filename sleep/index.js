const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

sleep(1000).then(() => {
  console.log("=====sleep");
});

function* sleepGenerator(time) {
  yield new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

sleepGenerator(1000)
  .next()
  .value.then(() => {
    console.log("=====sleepGenerator");
  });

async function output() {
  let out = await sleep(1000);
  console.log("=====sleep async====");
  return out;
}
output();

function sleepcallback(callback, time) {
  if (typeof callback === "function") setTimeout(callback, time);
}

function output1() {
  console.log("=======sleep sleepcallback====");
}

sleepcallback(output1, 1000);
