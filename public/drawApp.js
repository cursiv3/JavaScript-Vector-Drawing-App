const penUpDownControl = require("./penUpDownControl");
const setColor = require("./setColor");
const penMovement = require("./penMovement/penMovement");
//var stream = "F0A040004000417F417FC04000400090400047684F5057384000804001C05F204000400001400140400040007E405B2C4000804000"
//var stream = "F0A04000417F4000417FC040004000804001C05F205F20804000"
//var stream ="F0A0417F40004000417FC067086708804001C0670840004000187818784000804000"
var stream = "F0A0417F41004000417FC067086708804001C067082C3C18782C3C804000";

function drawApp(dataStream) {
  // =======================   GLOBAL VARS   =======================

  const bytecodeArr = dataStream.match(/.{2}/g);
  const canvasPositiveMax = 8191;
  const canvasNegativeMax = -8192;
  var state = {
    pen: "UP",
    x: 0,
    y: 0,
    color: [0, 0, 0, 255],
    inBounds: true,
    actions: []
  };

  // ======================= END GLOBAL VARS =======================

  // since opcode unencoded we can read it as str
  for (var currentByte = 0; currentByte < bytecodeArr.length; currentByte++) {
    switch (bytecodeArr[currentByte]) {
      case "F0": // clear
        state = Object.assign({}, state, {
          pen: "UP",
          x: 0,
          y: 0,
          color: [0, 0, 0, 255]
        });
        state.actions.push("CLR;");
        break;
      case "A0": // set color
        setColor(bytecodeArr, currentByte, state);
        break;
      case "C0": // pen move
        state = penMovement(
          bytecodeArr,
          currentByte,
          canvasPositiveMax,
          canvasNegativeMax,
          state
        );
        break;
      case "80": // pen up or down
        state = penUpDownControl(bytecodeArr, currentByte, state);
        break;
    }
  }
  console.log(state.actions.join("\n"));
  return state.actions.join("\n");
}

drawApp(stream);
