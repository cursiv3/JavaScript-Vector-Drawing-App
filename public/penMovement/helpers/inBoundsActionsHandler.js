const rightToLeftHandler = require("./rightToLeftHandler"),
  leftToRightHandler = require("./leftToRightHandler"),
  penUpDownControl = require("../../penUpDownControl");

function inBoundsActionsHandler(
  fromX,
  fromY,
  toX,
  toY,
  slope,
  canvasPositiveMax,
  canvasNegativeMax,
  state
) {
  var penDownMoves = [];

  if (fromX > canvasPositiveMax && slope != 0) {
    // if returning from outside max,positive, and has slope
    var penDownMoves = rightToLeftHandler(
      fromX,
      fromY,
      slope,
      canvasPositiveMax,
      state
    );
    var newState = penUpDownControl(null, null, state);
    return { penDownMoves: penDownMoves, state: newState };
  } else if (fromX > canvasPositiveMax) {
    // if returning from outside positive max and no slope
    return { penDownMoves: ["(" + toX + ", " + toY + ")"], state: state };
  } else if (fromX < canvasNegativeMax) {
    // if returning from outside max and negative
    leftToRightHandler(toX, toY, slope, canvasNegativeMax, state);
  } else if (fromY > canvasPositiveMax) {
    // if coming from outside max and positive
    var penDownMoves = rightToLeftHandler(
      fromX,
      fromY,
      slope,
      canvasPositiveMax,
      state
    );
    var newState = penUpDownControl(null, null, state);
    return { penDownMoves: penDownMoves, state: newState };
  } else if (fromY < canvasNegativeMax) {
    // if returning from outside max and negative
    leftToRightHandler(toX, toY, slope, canvasNegativeMax, state);
  } else if (state.pen == "UP") {
    state.actions.push("MV (" + state.x + ", " + state.y + ");");
    return { state: state };
  } else if (state.pen == "DOWN") {
    return {
      penDownMoves: "(" + state.x + ", " + state.y + ")",
      state: state
    };
  }
}

module.exports = inBoundsActionsHandler;
