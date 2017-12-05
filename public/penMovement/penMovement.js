import { inBoundsActionsHandler } from "./helpers/inBoundsActionsHandler"
import { outOfBoundsActionsHandler } from "./helpers/outOfBoundsActionsHandler"
import { loadEncodedParamsArray } from "./helpers/loadEncodedParamsArray"
import { loadDecodedParamsArray } from "./helpers/loadDecodedParamsArray"
import { updateStateXY } from "./helpers/updateStateXY"
import { boundaryCheck } from "./helpers/boundaryCheck"

export function penMovement(bytecodeArr, currentByte, canvasPositiveMax, canvasNegativeMax, state) 
{
  /* 
  records variable number of args following a move cmd decodes args
  takes pairs of decoded args as X Y
  if pen up, reports end point of move
  if pen down, reports each movement
  if pen leaves area while down, pen moves to up and position reported 
   */

  let encodedParams = loadEncodedParamsArray(currentByte, bytecodeArr);
  let decodedParams = loadDecodedParamsArray(encodedParams);

  var penDownMoves = [];

  for (var byte = 0; byte < decodedParams.length; byte += 2) {

    // store current state as xy we are moving from
    var fromX = state.x;
    var fromY = state.y;

    state = updateStateXY(decodedParams[byte], decodedParams[byte + 1], state);

    var toX = state.x;
    var toY = state.y;

    // "I'm never going to use this, why am I learning it?" -13 year old me
    var rise =  Math.abs(fromY + (toY * -1)) 
    var run = Math.abs(fromX + (toX * -1))
    var slope = rise / run;

    // returns 'x' or 'y' if x/y out of bounds, otherwise returns null
    // sets state.inBounds to true/false accordingly
    var boundaryCheckObject = boundaryCheck(state.x, state.y, canvasPositiveMax, canvasNegativeMax, state);
    state = boundaryCheckObject.state;

    var outOfBounds = boundaryCheckObject.outOfBounds;

    // I use == bool so reading is quick and obvious and extra layer
    // of control on exactly what is going through
    // same with 'else if' instead of just 'else'
    if (state.inBounds == true) 
    {
      // inBoundsActionsHandler pushes xy move pair to state.actions if pen state is UP
      // otherwise it returns a formatted xy movement pair to be added to penDownMoves tracker array
      var newStateAndActions = inBoundsActionsHandler(fromX, fromY, toX, toY, slope, canvasPositiveMax, canvasNegativeMax, state);
      penDownMoves.push(newStateAndActions.penDownMoves);
      state = newStateAndActions.state;
    }
    else if (state.inBounds == false) 
    {
      state = outOfBoundsActionsHandler(outOfBounds, slope, canvasPositiveMax, canvasNegativeMax, state);
    }
  }
  if (penDownMoves[0] != undefined) 
  {
    state.actions.push('MV ' + penDownMoves.join(' ') + ';');
  }
  return state;
}