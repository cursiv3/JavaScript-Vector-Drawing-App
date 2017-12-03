export function loadDecodedParamsArray() {
    let decodedParams = [];
    for (var byte = 0; byte < encodedParams.length; byte += 2) {
        let param = decoder(encodedParams[byte], encodedParams[byte + 1]);
        decodedParams.push(param);
    }
    return decodedParams;
}