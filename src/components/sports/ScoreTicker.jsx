
//for livescore data for each game
//https://statsapi.mlb.com/api/v1/game/{game_id}/linescore


/*
    -Get the data for scores, separated by league
    -process the data to match our expected input
    -> This step will be eliminated with a proper backend
    -> during processing, we will need to grab the live score data for any live games
    - Processed data will be in the form of "screens", grouped by league
    - There will be a timer that will change the active display data to the next in the list
    - Changing the active selection will trigger a re-render on the ticker
*/

import { useMemo } from "react";
import { processMLBData } from "../../controllers/mlbController";
import { prepScreens } from "../../controllers/scoreTickerController";
import MLBScoreBox from "./MLBScoreBox";
import "./scoreTicker.css";

export const ScoreTicker = ({ mlb }) => {

    //TODO: Memoize this
    const processedMLBData = useMemo(() => { return processMLBData(mlb); }, [mlb])
    const screensData = useMemo(() => { return prepScreens({ mlb: processedMLBData }) }, [processedMLBData]);

    return (
        <div className="score-ticker">

            <p>{screensData ? screensData.length : 0}</p>
        </div>)

}

export default ScoreTicker;