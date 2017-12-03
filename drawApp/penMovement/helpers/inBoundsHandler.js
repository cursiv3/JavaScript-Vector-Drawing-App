import { rightToLeftHandler } from "./rightToLeftHandler"
import { leftToRightHandler } from "./leftToRightHandler"

export function inBoundsActionsHandler(argsObj, stateObj)
{
    let d = argsObj;
    if (d.fromX > d.canvasPositiveMax) // if coming from outside max and positive
    {
        rightToLeftHandler(argsObj, stateObj);
    }
    else if (fromX < canvasNegativeMax) // if returning from outside max and negative
    {
        leftToRightHandler(argsObj, stateObj);
    }
    else if (stateObj.pen == 'UP') {
      stateObj.actions.push('MV (' + stateObj.x + ', ' + stateObj.y + ')');
    }
    else if (stateObj.pen == 'DOWN')
    {
      d.penDownMoves.push('(' + stateObj.x + ', ' + stateObj.y + ')');
    }
}