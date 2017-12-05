const boundaryCheck = require("../penMovement/helpers/boundaryCheck");
const chai = require("chai");

var expect = chai.expect,
  assert = chai.assert,
  should = chai.should();

var positiveMax = 8191,
  negativeMax = -8192;

describe("boundaryCheck", function() {
  it("returns an object", function() {
    var state = {},
      x = 0,
      y = 0,
      returnObj = boundaryCheck(x, y, positiveMax, negativeMax, state);
    expect(returnObj).to.be.a("object");
  });

  it("returns object containing state object", function() {
    var state = { color: null, actions: [] },
      x = 0,
      y = 0,
      returnObj = boundaryCheck(x, y, positiveMax, negativeMax, state);
    expect(returnObj).to.have.property("state");
    returnObj.state.should.be.an("object");
  });

  it("returns object containing outOfBounds key with string val if x too large", function() {
    var state = {},
      x = 10000,
      y = 0,
      returnObj = boundaryCheck(x, y, positiveMax, negativeMax, state);

    expect(returnObj).to.have.property("outOfBounds");
    returnObj.outOfBounds.should.be.a("string");
  });

  it("returns object containing inBounds: false if x too large", function() {
    var state = {},
      x = 10000,
      y = 0,
      returnObj = boundaryCheck(x, y, positiveMax, negativeMax, state).state
        .inBounds;
    assert.equal(returnObj, false);
  });

  it("returns object containing outOfBounds key with string val if y too large", function() {
    var state = {},
      x = 0,
      y = 10000,
      returnObj = boundaryCheck(x, y, positiveMax, negativeMax, state);

    expect(returnObj).to.have.property("outOfBounds");
    returnObj.outOfBounds.should.be.a("string");
  });

  it("returns object containing inBounds: false if y too large", function() {
    var state = {},
      x = 0,
      y = 10000,
      returnObj = boundaryCheck(x, y, positiveMax, negativeMax, state).state
        .inBounds;
    assert.equal(returnObj, false);
  });
});
