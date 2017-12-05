export function loadEncodedParamsArray(currentByte, bytecodeArr) {
    let encodedParams = [];
    for (var byte = currentByte + 1; byte < bytecodeArr.length; byte++) {
      if ((parseInt(bytecodeArr[byte], 16) & 0x80) == 128) {
          break;
        }
        else
        {
          encodedParams.push(bytecodeArr[byte])
        }
    }
    return encodedParams;
}