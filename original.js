function penMovement(array, idx) 
{
  let encodedParams = []
  let decodedParams = []
  
  // find next cmd, gather params until next cmd reached
  for (var x = idx + 1; x < array.length; x++) {
    if ((parseInt(array[x], 16) & 0x80) == 128) {
      break;
    }
    else
    {
      encodedParams.push(array[x])
    }
  }
  //decode params
  for (var x = 0; x < encodedParams.length; x += 2) {
    let param = decoder(encodedParams[x], encodedParams[x + 1]);
    decodedParams.push(param);
  }
  
  var downMoves = []
  for (var x = 0; x < decodedParams.length; x += 2) {
    var fromX = state.x;
    var fromY = state.y;
    updateStateXY(decodedParams[x], decodedParams[x + 1]);
    var toX = state.x;
    var toY = state.y;
    var rise =  Math.abs(fromY + (toY * -1)) 
    var run = Math.abs(fromX + (toX * -1))
    var slope = rise / run;
    
    var outOfBound = boundaryCheck(state.x, state.y); 
    
    // I use == bool so reading is quick and obvious and extra layer
    // of control on exactly what is going through
    // same with 'else if' instead of just 'else'
    if (state.inBounds == true) 
    {
      if (fromX > canvasPositiveMax) 
      {
        let firstYinbound = Math.round((fromX - canvasPositiveMax) * (slope * -1) + fromY);
        let xMax = setToBoundaryMax(fromX);
        state.actions.push('MV (' + xMax + ', ' + firstYinbound + ')')
        penUpDownControl(null);
        downMoves.push('(' + state.x + ', ' + state.y + ')');
      }
      else if (fromX < canvasNegativeMax) 
      {
        let lastYinbound = Math.round((state.x + 8192) * slope + state.y);
        let xMax = setToBoundaryMax(state.x);
        state.actions.push('MV (' + xMax + ', ' + lastYinbound + ')')
        penUpDownControl(null);
        downMoves.push('(' + state.x + ', ' + state.y + ')');
      }
      else if (state.pen == 'UP') {
        state.actions.push('MV (' + state.x + ', ' + state.y + ')');
      }
      else if (state.pen == 'DOWN')
      {
        downMoves.push('(' + state.x + ', ' + state.y + ')');
      }
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
            //let yMax = setToBoundaryMax(state.y);
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
  
  if (downMoves.length > 0) 
  {
    state.actions.push('MV ' + downMoves.join(' ') + ';');
  } 
  // end func
}