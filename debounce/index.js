var count = 1;
var container = document.getElementById("container");

function getUserAction(e) {
  container.innerHTML = count++;
}

// container.onmousemove = getUserAction;

// container.onmousemove = debounce(getUserAction, 1000, false);
var count = 1;
var container = document.getElementById("container");

function getUserAction(e) {
  container.innerHTML = count++;
}

var setUseAction = debounce(getUserAction, 1000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener("click", function () {
  setUseAction.cancel();
});

function debounce(func, wait, immediate) {
  var result;
  var timeout;

  var debounced = function (val) {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);

    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
