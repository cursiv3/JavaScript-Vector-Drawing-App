export function rightToLeftHandler(argsObj, stateObj) {
    let firstYinbound = Math.round((x1 - maxSizePos) * (mx * -1) + y1);
    let xMax = setToBoundaryMax(x1);
    stateObj.actions.push('MV (' + xMax + ', ' + firstYinbound + ')')
    penUpDownControl(null);
    downMoves.push('(' + stateObj.x + ', ' + stateObj.y + ')');
}