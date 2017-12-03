import { inBoundsActionsHandler } from "./helpers/inBoundsHandler"
import { loadEncodedParamsArray }   from "./helpers/loadEncodedParamsArray"

// bytecodeArr, currentByte, canvasPositiveMax, canvasNegativeMax, state
export function penMovement(bytecodeArr, currentByte, canvasPositiveMax, canvasNegativeMax, state) 
{
  // records variable number of args following a move cmd
  // decodes args
  // takes pairs of decoded args as X Y
  // if pen up, reports end point of move
  // if pen down, reports each movement
  // if pen leaves area while down, pen moves to up and position reported
  
  let encodedParams = loadEncodedParamsArray(currentByte, bytecodeArr);
  let decodedParams = loadDecodedParamsArray(encodedParams);
  

  var penDownMoves = []
  for (var byte = 0; byte < decodedParams.length; byte += 2) {

    // store current state as xy we are moving from
    var fromX = state.x;
    var fromY = state.y;

    // update state to xy we are moving to and make prettier variables
    updateStateXY(decodedParams[byte], decodedParams[byte + 1]);
    var toX = state.x;
    var toY = state.y;

    // "I'm never going to use this, why am I learning it?" -13 year old me
    var rise =  Math.abs(fromY + (toY * -1)) 
    var run = Math.abs(fromX + (toX * -1))
    var slope = rise / run;
    
    // returns 'x' or 'y' if x/y out of bounds, otherwise returns null
    // sets state.inBounds to true/false accordingly
    var outOfBound = boundaryCheck(state.x, state.y); 
    
    // I use == bool so reading is quick and obvious and extra layer
    // of control on exactly what is going through
    // same with 'else if' instead of just 'else'
    if (state.inBounds == true) 
    {
      let handlerArgsObj = {
        fromX: fromX,
        fromY: fromY,
        slope: slope,
        canvasPositiveMax: canvasPositiveMax,
        canvasNegativeMax:canvasNegativeMax,
        penDownMoves: penDownMoves
      }
      inBoundsActionsHandler(handlerArgsObj, state);
    }
    else if (state.inBounds == false) 
    {
      switch(outOfBound) {
        case 'x':
          if (state.x > canvasPositiveMax) {
            let lastYinbound = Math.round((state.x - canvasPositiveMax) * slope + state.y);
            let xMax = setToBoundaryMax(state.x);
            state.actions.push('MV (' + xMax + ', ' + lastYinbound + ')')
            penUpDownControl(null);
            break;
          }
          else 
          { 
            let lastYinbound = Math.round((state.x + 8192) * slope + state.y);
            let xMax = setToBoundaryMax(state.x);
            state.actions.push('MV (' + xMax + ', ' + lastYinbound + ')')
            penUpDownControl(null);
            break;
          }
        case 'y':
          if (state.y > canvasPositiveMax) {
            let lastXinbound = Math.round((state.y - canvasPositiveMax) * slope + state.x);
            let yMax = setToBoundaryMax(state.x);
            state.actions.push('MV (' + lastXinbound + ', ' + yMax + ')')
            penUpDownControl(null);
            break;
          }
          else 
          {
            let lastXinbound = Math.round((state.y + 8192) * slope + state.x);
            let yMax = setToBoundaryMax(state.x);
            state.actions.push('MV (' + lastXinbound + ', ' + yMax + ')')
            penUpDownControl(null);
            break;
          }
      }
    }
  }
  
  if (penDownMoves.length > 0) 
  {
    state.actions.push('MV ' + penDownMoves.join(' ') + ';');
  } 
}