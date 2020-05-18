(function (history) {
  let pushState = history.pushState;
  history.pushState = function (state) {
    if (typeof history.onpushstate == "function") {
      history.onpushstate(arguments[2]);
    }
    return pushState.apply(history, arguments);
  };
})(window.history);
