const decoder = require("../decoder");

const chai = require("chai");

var expect = chai.expect,
  assert = chai.assert;

describe("decoder", function() {
  it("should throw an error when value larger than 0x7F (hex 80 = 128 dec)", function() {
    expect(function() {
      decoder("80", "10");
    }).to.throw("Parameters must be between 0x7F and 0x00");
  });

  it("should throw an error when value smaller than 0x00 (hex FFFF = -1)", function() {
    expect(function() {
      decoder("FFFF", "10");
    }).to.throw("Parameters must be between 0x7F and 0x00");
  });

  it("should return unencoded int from hex values between 0x7F and 0x00", function() {
    assert.equal(decoder("40", "00"), "0");
  });
});
