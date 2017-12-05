const setColor = require("../setColor");
const chai = require("chai");

var expect = chai.expect,
  assert = chai.assert;

var array = [null, "41", "7F", "41", "00", "40", "00", "41", "7F"];
var idx = 0;

describe("setColor", function() {
  it("returns an object", function() {
    var state = { color: null, actions: [] };
    var returnObj = setColor(array, idx, state);

    expect(returnObj).to.be.a("object");
  });

  it("pushes four values to color array given eight hex bytes", function() {
    var state = { color: null, actions: [] };

    assert.equal(setColor(array, idx, state).color.length, 4);
  });

  it("pushes one value to the actions array given 8 bytes", function() {
    var state = { color: null, actions: [] };

    assert.equal(setColor(array, idx, state).actions.length, 1);
  });

  it("properly decodes eight bytes given to it", function() {
    var state = { color: null, actions: [] };
    var actionString = setColor(array, idx, state).actions[0];

    assert.equal(actionString, "CO 255 128 0 255;");
  });
});
