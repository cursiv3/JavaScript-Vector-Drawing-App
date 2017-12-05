function updateStateXY(x, y, state) {
  if (x != undefined) {
    state = Object.assign({}, state, { x: state.x + x });
  }
  if (y != undefined) {
    state = Object.assign({}, state, { y: state.y + y });
  }
  return state;
}

module.exports = updateStateXY;
