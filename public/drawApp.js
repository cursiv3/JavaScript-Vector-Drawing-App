const penUpDownControl = require("./penUpDownControl");
const setColor = require("./setColor");
const penMovement = require("./penMovement/penMovement");


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
  for (var currentByte = 0; currentByte < bytecodeArr.length; currentByte++) 
  {
    switch (bytecodeArr[currentByte]) 
    {
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
      state = setColor(bytecodeArr, currentByte, state);
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

  var mainDiv = document.getElementById("main");
  var resultsDiv = document.createElement("div");
  resultsDiv.setAttribute("style", "border: 2px solid black; margin: 3px;");

  state.actions.map(function(val, idx) 
  {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = state.actions[idx];

    return resultsDiv.appendChild(paragraph);
  });

  mainDiv.appendChild(resultsDiv);
}

module.exports = { drawApp: drawApp };
