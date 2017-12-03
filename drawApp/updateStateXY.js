export function updateStateXY(x, y) 
{
  if(x != undefined)
    {
      state = Object.assign({}, state, {x: state.x + x});
    }
  if (y != undefined)
    {
      state = Object.assign({}, state, {y: state.y + y});
    }
}