function decoder(byte1, byte2) {
  let b1 = ("00000000" + parseInt(byte1, 16).toString(2)).substr(-7);
  let b2 = ("00000000" + parseInt(byte2, 16).toString(2)).substr(-7);
  return parseInt(b1 + b2, 2) - 8192;
}

module.exports = decoder;
