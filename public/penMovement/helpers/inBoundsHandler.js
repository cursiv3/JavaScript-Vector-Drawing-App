import { rightToLeftHandler } from "./rightToLeftHandler"
import { leftToRightHandler } from "./leftToRightHandler"

export function inBoundsActionsHandler(fromX, fromY, slope, canvasPositiveMax, canvasNegativeMax, penDownMoves, state)
{
    if (fromX > canvasPositiveMax) // if coming from outside max and positive
    {
        rightToLeftHandler(fromX, fromY, slope, canvasPositiveMax, canvasNegativeMax, penDownMoves, state);
    }
    else if (fromX < canvasNegativeMax) // if returning from outside max and negative
    {
        leftToRightHandler(fromX, fromY, slope, canvasPositiveMax, canvasNegativeMax, penDownMoves, state);
    }
    else if (state.pen == 'UP') {
      state.actions.push('MV (' + state.x + ', ' + state.y + ')');
    }
    else if (state.pen == 'DOWN')
    {
      penDownMoves.push('(' + state.x + ', ' + state.y + ')');
    }
}