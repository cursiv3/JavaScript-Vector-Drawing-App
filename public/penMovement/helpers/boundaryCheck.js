export function boundaryCheck(x, y, canvasPositiveMax, canvasNegativeMax, state) 
{
  if (x > canvasPositiveMax || x < canvasNegativeMax)
  {
    state = Object.assign({}, state, { inBounds: false })
    return 'x';
  }
  else if (y > canvasPositiveMax || y < canvasNegativeMax)
  {
    console.log('y in outbound check: ', y)
    state = Object.assign({}, state, { inBounds: false })
    return 'y';
  }
  else
  {
    state = Object.assign({}, state, { inBounds: true })
  }
}