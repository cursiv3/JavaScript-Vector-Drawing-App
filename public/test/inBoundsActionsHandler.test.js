const inBoundsActionsHandler = require("../penMovement/helpers/inBoundsActionsHandler");
const chai = require("chai");

var expect = chai.expect,
  assert = chai.assert,
  should = chai.should;

var positiveMax = 8191,
  negativeMax = -8192;

describe("setColor", function() {
  it("returns an object", function() {
    var state = { pen: "UP", actions: [] };
    var returnObj = inBoundsActionsHandler(
      1,
      1,
      2,
      2,
      1,
      positiveMax,
      negativeMax,
      state
    );

    expect(returnObj).to.be.a("object");
  });

  it("changes state.pen if first arg (fromX) > positiveMax", function() {
    var state = { pen: "UP", actions: [] },
      returnObj = inBoundsActionsHandler(
        10000,
        1,
        2,
        2,
        1,
        positiveMax,
        negativeMax,
        state
      );
    expect(returnObj).to.have.property("state");
    expect(returnObj.state).to.have.property("pen");
    assert.equal(returnObj.state.pen, "DOWN");
  });

  it("changes state.pen if first arg (fromX) < negativeMax", function() {
    var state = { pen: "UP", actions: [] },
      returnObj = inBoundsActionsHandler(
        10000,
        1,
        2,
        2,
        1,
        positiveMax,
        negativeMax,
        state
      );
    expect(returnObj).to.have.property("state");
    expect(returnObj.state).to.have.property("pen");
    assert.equal(returnObj.state.pen, "DOWN");
  });

  it("changes state.pen if second arg (fromY) > positiveMax", function() {
    var state = { pen: "UP", actions: [] },
      returnObj = inBoundsActionsHandler(
        1,
        10000,
        2,
        2,
        1,
        positiveMax,
        negativeMax,
        state
      );
    expect(returnObj).to.have.property("state");
    expect(returnObj.state).to.have.property("pen");
    assert.equal(returnObj.state.pen, "DOWN");
  });

  it("changes state.pen if second arg (fromY) < negativeMax", function() {
    var state = { pen: "UP", actions: [] },
      returnObj = inBoundsActionsHandler(
        1,
        10000,
        2,
        2,
        1,
        positiveMax,
        negativeMax,
        state
      );
    expect(returnObj).to.have.property("state");
    expect(returnObj.state).to.have.property("pen");
    assert.equal(returnObj.state.pen, "DOWN");
  });

  it("returns an object with state and actions.length = 1 if 1st and 2nd args good and PEN = UP", function() {
    var state = { pen: "UP", actions: [] },
      returnObj = inBoundsActionsHandler(
        1,
        1,
        2,
        2,
        1,
        positiveMax,
        negativeMax,
        state
      );
    expect(returnObj).to.have.property("state");
    assert.equal(returnObj.state.actions.length, 1);
  });

  it("returns an object with prop penDownMoves (string) if 1st and 2nd args good and PEN = DOWN", function() {
    var state = { pen: "DOWN", actions: [] },
      returnObj = inBoundsActionsHandler(
        1,
        1,
        2,
        2,
        1,
        positiveMax,
        negativeMax,
        state
      );
    expect(returnObj).to.have.property("penDownMoves");
    returnObj.penDownMoves.should.be.a("string");
  });
});
