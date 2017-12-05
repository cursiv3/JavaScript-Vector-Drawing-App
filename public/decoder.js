function decoder(byte1, byte2) {
  let b1Size = parseInt(byte1, 16);
  let b2Size = parseInt(byte2, 16);

  if (b1Size > 0x7f || b1Size < 0x00 || b2Size > 0x7f || b2Size < 0x00) {
    throw "Parameters must be between 0x7F and 0x00";
  } else {
    let b1 = ("00000000" + parseInt(byte1, 16).toString(2)).substr(-7);
    let b2 = ("00000000" + parseInt(byte2, 16).toString(2)).substr(-7);
    return parseInt(b1 + b2, 2) - 8192;
  }
}

module.exports = decoder;
