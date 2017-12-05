const x_outOfBoundHandler = require("../penMovement/helpers/x_outOfBoundHandler");

const chai = require("chai");

var expect = chai.expect,
  assert = chai.assert,
  positiveMax = 8191,
  negativeMax = -8192;

describe("x_outOfBoundHandler", function() {
  it("should return an object", function() {
    var stateObj = {
      actions: [],
      x: positiveMax + 1,
      y: 5000
    };
    var slope = 1;
    var lastYIn = Math.round((stateObj.x - positiveMax) * slope + stateObj.y);
    var boundCrossed = positiveMax;
    var OOB = x_outOfBoundHandler(
      slope,
      boundCrossed,
      positiveMax,
      negativeMax,
      stateObj
    );
    expect(OOB).to.be.a("object");
  });

  it("should push positiveMax and last Y in bounds to actions when x > positiveMax", function() {
    var stateObj = {
      actions: [],
      x: positiveMax + 1,
      y: 5000
    };
    var slope = 1;
    var lastYIn = Math.round((stateObj.x - positiveMax) * slope + stateObj.y);
    var boundCrossed = positiveMax;
    assert.equal(
      x_outOfBoundHandler(
        slope,
        boundCrossed,
        positiveMax,
        negativeMax,
        stateObj
      ).actions[0],
      "MV (" + positiveMax + ", " + lastYIn + ")"
    );
  });

  it("should push negativeMax and last Y in bounds to actions when x < negativeMax", function() {
    var stateObj = {
      actions: [],
      x: negativeMax - 1,
      y: 5000
    };
    var slope = 1;
    var lastYIn = Math.round((stateObj.x - negativeMax) * slope + stateObj.y);
    var boundCrossed = negativeMax;
    assert.equal(
      x_outOfBoundHandler(
        slope,
        boundCrossed,
        positiveMax,
        negativeMax,
        stateObj
      ).actions[0],
      "MV (" + negativeMax + ", " + lastYIn + ")"
    );
  });
});
