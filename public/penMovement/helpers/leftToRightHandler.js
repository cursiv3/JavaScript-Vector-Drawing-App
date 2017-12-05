function leftToRightHandler(
  fromX,
  fromY,
  slope,
  canvasNegativeMax,
  penDownMoves,
  state
) {
  let lastYinbound = Math.round(
    (state.x - canvasNegativeMax) * slope + state.y
  );
  let xMax = setToBoundaryMax(state.x);
  state.actions.push("MV (" + xMax + ", " + lastYinbound + ")");
  penUpDownControl(null, null, state);
  penDownMoves.push("(" + state.x + ", " + state.y + ")");
}

module.exports = leftToRightHandler;
