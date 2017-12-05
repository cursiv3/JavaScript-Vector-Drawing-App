const penUpDownControl = require("../penUpDownControl");

const chai = require("chai");

var expect = chai.expect,
  assert = chai.assert,
  positiveMax = 8191,
  negativeMax = -8192;

describe("penUpDownControl", function() {
  it("should push PEN DOWN; to actions when state.pen == UP", function() {
    assert.equal(
      penUpDownControl(null, 0, { pen: "UP", actions: [] }).actions[0],
      "PEN DOWN;"
    );
  });
  it("should push PEN UP; to actions when state.pen == DOWN", function() {
    assert.equal(
      penUpDownControl(null, 0, { pen: "DOWN", actions: [] }).actions[0],
      "PEN UP;"
    );
  });
  it("should return state.pen: 'DOWN' in obj when state.pen: 'UP'", function() {
    assert.equal(
      penUpDownControl(null, 0, { pen: "UP", actions: [] }).pen,
      "DOWN"
    );
  });
  it("should return state.pen: 'UP' in obj when state.pen: 'DOWN'", function() {
    assert.equal(
      penUpDownControl(null, 0, { pen: "DOWN", actions: [] }).pen,
      "UP"
    );
  });
  it("should decode encoded pairs correctly", function() {
    assert.equal(
      penUpDownControl([null, "40", "01"], 0, { pen: "DOWN", actions: [] }).pen,
      "DOWN"
    );
  });
});
