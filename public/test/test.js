const setToBoundaryMax = require("../penMovement/helpers/setToBoundaryMax");
const chai = require("chai");

var assert = chai.assert;

describe("setToBoundaryMax", function() {
  it("should return 8191 if value > 8191", function() {
    assert.equal(setToBoundaryMax(10000, 8191, -8192), 8191);
  });
  it("should return -8192 if value < -8192", function() {
    assert.equal(setToBoundaryMax(-10000, 8191, -8192), -8192);
  });
  it("should return value if 8191 > value > -8192", function() {
    assert.equal(setToBoundaryMax(5000, 8191, -8192), 5000);
  });
});
