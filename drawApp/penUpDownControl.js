export function penUpDown(array, iter) 
{
  var d = 0;
  if (array != null)
  {
    d = parseInt(array[iter + 1] + array[iter + 2], 16);
    d = d.toString(2);
    d = d.substr(-7);
    d = parseInt(d, 2);
  }
  
  if (d != 0 || state.pen != 'DOWN') 
  {
    state = Object.assign({}, state, { pen: 'DOWN' });
    state.actions.push('PEN DOWN;');
  } 
  else if (state.pen != 'UP') 
  {
    state = Object.assign({}, state, { pen: 'UP' });
    state.actions.push('PEN UP;');
  }
}