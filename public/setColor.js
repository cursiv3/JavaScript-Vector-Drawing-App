const decoder = require("./decoder");

function setColor(
  array,
  idx,
  state // takes the index of the array where setColor was triggered // takes the next 8 indices for RGBA values // takes 8 because the data was regex'd into pairs // each pair is one byte, each parameter is two bytes
) {
  var rgba = [];
  // loop to 8 by 2
  // idx is ref point in data stream where cmd called
  // next 8 bytes are encoded RGBA values
  // loop by 2 so we dont get duplicates in pairs
  for (var x = 1; x < 9; x += 2) {
    let byte1 = idx + x;
    let byte2 = byte1 + 1;
    let col = decoder(array[byte1], array[byte2]);
    rgba.push(col);
  }

  // formatting for output, update state with new color and action performed
  let color = "CO " + rgba.join(" ");
  state = Object.assign({}, state, {
    color: rgba
  });
  state.actions.push(color + ";");
  return state;
}

module.exports = setColor;
