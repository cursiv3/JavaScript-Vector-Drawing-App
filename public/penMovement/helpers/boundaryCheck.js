const penUpDownControl = require("../../penUpDownControl");

function boundaryCheck(x, y, canvasPositiveMax, canvasNegativeMax, state) {
  var returnObj = {
    outOfBounds: null,
    state: state
  };
  if (x > canvasPositiveMax || x < canvasNegativeMax) {
    return {
      state: Object.assign({}, state, { inBounds: false }),
      outOfBounds: "x"
    };
  } else if (y > canvasPositiveMax || y < canvasNegativeMax) {
    return {
      state: Object.assign({}, state, { inBounds: false }),
      outOfBounds: "y"
    };
  } else {
    return { state: Object.assign({}, state, { inBounds: true }) };
  }
}

module.exports = boundaryCheck;
