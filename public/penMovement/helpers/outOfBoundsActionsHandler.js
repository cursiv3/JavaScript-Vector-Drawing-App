const setToBoundaryMax = require("./setToBoundaryMax");
import { penUpDownControl } from "../../penUpDownControl";

export function outOfBoundsActionsHandler(
  outOfBounds,
  slope,
  canvasPositiveMax,
  canvasNegativeMax,
  state
) {
  switch (outOfBounds) {
    case "x":
      if (state.x > canvasPositiveMax) {
        let lastYinbound = Math.round(
          (state.x - canvasPositiveMax) * slope + state.y
        );
        let xMax = setToBoundaryMax(
          state.x,
          canvasPositiveMax,
          canvasNegativeMax
        );
        state.actions.push("MV (" + xMax + ", " + lastYinbound + ")");
        return penUpDownControl(null, null, state);
      } else if (state.x < canvasNegativeMax) {
        let lastYinbound = Math.round(
          (state.x - canvasNegativeMax) * slope + state.y
        );
        let xMax = setToBoundaryMax(
          state.x,
          canvasPositiveMax,
          canvasNegativeMax
        );
        state.actions.push("MV (" + xMax + ", " + lastYinbound + ")");
        return penUpDownControl(null, null, state);
        break;
      }
    case "y":
      if (state.y > canvasPositiveMax) {
        let lastXinbound = Math.round(
          (state.y - canvasPositiveMax) * slope + state.x
        );
        let yMax = setToBoundaryMax(
          state.x,
          canvasPositiveMax,
          canvasNegativeMax
        );
        state.actions.push("MV (" + lastXinbound + ", " + yMax + ")");
        return penUpDownControl(null, null, state);
        break;
      } else if (state.y < canvasNegativeMax) {
        let lastXinbound = Math.round(
          (state.y - canvasNegativeMax) * slope + state.x
        );
        let yMax = setToBoundaryMax(
          state.x,
          canvasPositiveMax,
          canvasNegativeMax
        );
        state.actions.push("MV (" + lastXinbound + ", " + yMax + ")");
        return penUpDownControl(null);
        break;
      }
  }
}
