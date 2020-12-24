var count = 1;
var container = document.getElementById("container");

function getUserAction(e) {
  console.log(e);
  container.innerHTML = count++;
}

var setUseAction = throttle(getUserAction, 2000);

container.onmousemove = setUseAction;

function throttle(func, wait) {
  var timeout;
  return function () {
    var args = arguments;
    var context = this;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
