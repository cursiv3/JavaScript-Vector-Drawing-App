const setToBoundaryMax = require("../penMovement/helpers/setToBoundaryMax");

const chai = require("chai");

var expect = chai.expect,
  assert = chai.assert,
  positiveMax = 8191,
  negativeMax = -8192;

describe("setToBoundaryMax", function() {
  it("should return positiveMax if value > positiveMax", function() {
    assert.equal(
      setToBoundaryMax(positiveMax + 1, positiveMax, negativeMax),
      positiveMax
    );
  });
  it("should return negativeMax if value < negativeMax", function() {
    assert.equal(
      setToBoundaryMax(negativeMax - 1, positiveMax, negativeMax),
      negativeMax
    );
  });
  it("should return value if positiveMax > value > negativeMax", function() {
    assert.equal(
      setToBoundaryMax(positiveMax - 1, positiveMax, negativeMax),
      positiveMax - 1
    );
  });
});
