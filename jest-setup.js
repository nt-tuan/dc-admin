import "@testing-library/jest-dom";

jest.mock("utils/config.util");
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {
        //
      },
      removeListener: function () {
        //
      }
    };
  };
