const setToBoundaryMax = require("./setToBoundaryMax");

function rightToLeftHandler(
  fromX, 
  fromY, 
  slope, 
  canvasPositiveMax, 
  state) 
{
  let firstYinbound = Math.round(
    (fromX - canvasPositiveMax) * (slope * -1) + fromY
  );
  let xMax = setToBoundaryMax(fromX, canvasPositiveMax);
  state.actions.push("MV (" + xMax + ", " + firstYinbound + ")");
  
  return "(" + state.x + ", " + state.y + ")";
}

module.exports = rightToLeftHandler;
