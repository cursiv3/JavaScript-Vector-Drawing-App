const y_outOfBoundHandler = require("../penMovement/helpers/y_outOfBoundHandler");

const chai = require("chai");

var expect = chai.expect,
  assert = chai.assert,
  positiveMax = 8191,
  negativeMax = -8192;

describe("y_outOfBoundHandler", function() {
  it("should return an object", function() {
    var stateObj = {
      actions: [],
      x: 5000,
      y: positiveMax + 1
    };
    var slope = 1;
    var lastXIn = Math.round((stateObj.y - positiveMax) * slope + stateObj.x);
    var boundCrossed = positiveMax;
    var OOB = y_outOfBoundHandler(
      slope,
      boundCrossed,
      positiveMax,
      negativeMax,
      stateObj
    );
    expect(OOB).to.be.a("object");
  });

  it("should push positiveMax and last X in bounds to actions when y > positiveMax", function() {
    var stateObj = {
      actions: [],
      x: 5000,
      y: positiveMax + 1
    };
    var slope = 1;
    var lastXIn = Math.round((stateObj.y - positiveMax) * slope + stateObj.x);
    var boundCrossed = positiveMax;
    assert.equal(
      y_outOfBoundHandler(
        slope,
        boundCrossed,
        positiveMax,
        negativeMax,
        stateObj
      ).actions[0],
      "MV (" + lastXIn + ", " + positiveMax + ");"
    );
  });

  it("should push negativeMax and last X in bounds to actions when y < negativeMax", function() {
    var stateObj = {
      actions: [],
      x: 5000,
      y: negativeMax - 1
    };
    var slope = 1;
    var lastXIn = Math.round((stateObj.y - negativeMax) * slope + stateObj.x);
    var boundCrossed = negativeMax;
    assert.equal(
      y_outOfBoundHandler(
        slope,
        boundCrossed,
        positiveMax,
        negativeMax,
        stateObj
      ).actions[0],
      "MV (" + lastXIn + ", " + negativeMax + ");"
    );
  });
});
