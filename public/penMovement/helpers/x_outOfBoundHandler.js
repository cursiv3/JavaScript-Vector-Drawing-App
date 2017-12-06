const setToBoundaryMax = require("./setToBoundaryMax");
const penUpDownControl = require("../../penUpDownControl");

function x_outOfBoundHandler(
  slope,
  boundCrossed,
  canvasPositiveMax,
  canvasNegativeMax,
  state
) {
  let lastYinbound = Math.round((state.x - boundCrossed) * slope + state.y);
  let xMax = setToBoundaryMax(state.x, canvasPositiveMax, canvasNegativeMax);
  state.actions.push("MV (" + xMax + ", " + lastYinbound + ");");
  return penUpDownControl(null, null, state);
}

module.exports = x_outOfBoundHandler;
