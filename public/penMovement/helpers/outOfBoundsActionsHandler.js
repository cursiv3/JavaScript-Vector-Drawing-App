const setToBoundaryMax = require("./setToBoundaryMax");
const penUpDownControl = require("../../penUpDownControl");
const x_outOfBoundHandler = require("./x_outOfBoundHandler");
const y_outOfBoundHandler = require("./y_outOfBoundHandler");

function outOfBoundsActionsHandler(
  outOfBounds,
  slope,
  canvasPositiveMax,
  canvasNegativeMax,
  state
) {
  switch (outOfBounds) {
    case "x":
      if (state.x > canvasPositiveMax) {
        let boundCrossed = canvasPositiveMax;
        let newState = x_outOfBoundHandler(
          slope,
          boundCrossed,
          canvasPositiveMax,
          canvasNegativeMax,
          state
        );
        return newState;
      } else if (state.x < canvasNegativeMax) {
        let boundCrossed = canvasNegativeMax;
        let newState = x_outOfBoundHandler(
          slope,
          boundCrossed,
          canvasPositiveMax,
          canvasNegativeMax,
          state
        );
        return newState;
      }
    case "y":
      if (state.y > canvasPositiveMax) {
        let boundCrossed = canvasPositiveMax;
        let newState = y_outOfBoundHandler(
          slope,
          boundCrossed,
          canvasPositiveMax,
          canvasNegativeMax,
          state
        );
        return newState;
      } else if (state.y < canvasNegativeMax) {
        let boundCrossed = canvasNegativeMax;
        let newState = y_outOfBoundHandler(
          slope,
          boundCrossed,
          canvasPositiveMax,
          canvasNegativeMax,
          state
        );
        return newState;
      }
  }
}

module.exports = outOfBoundsActionsHandler;
