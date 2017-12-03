export function leftToRightHandler(argsObj, stateObj) {
    let lastYinbound = Math.round((stateObj.x - maxSizeNeg) * slope + stateObj.y);
    let xMax = setToBoundaryMax(stateObj.x);
    stateObj.actions.push('MV (' + xMax + ', ' + lastYinbound + ')');
    penUpDownControl(null);
    downMoves.push('(' + stateObj.x + ', ' + stateObj.y + ')');
};