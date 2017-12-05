const setToBoundaryMax = require("./setToBoundaryMax");
const penUpDownControl = require("../../penUpDownControl");

function y_outOfBoundHandler(
  slope,
  boundCrossed,
  canvasPositiveMax,
  canvasNegativeMax,
  state
) {
  let lastXinbound = Math.round((state.y - boundCrossed) * slope + state.x);
  let yMax = setToBoundaryMax(state.y, canvasPositiveMax, canvasNegativeMax);
  state.actions.push("MV (" + lastXinbound + ", " + yMax + ")");
  return penUpDownControl(null, null, state);
}
module.exports = y_outOfBoundHandler;
