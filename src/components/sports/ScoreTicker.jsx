
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

import { useMemo, useState } from "react";
import { processMLBData } from "../../controllers/mlbController";
import { prepScreens } from "../../controllers/scoreTickerController";
import MLBScoreBox from "./MLBScoreBox";
import "./scoreTicker.css";

export const ScoreTicker = ({ mlb }) => {

    const processedMLBData = useMemo(() => { return processMLBData(mlb); }, [mlb])
    const screensData = useMemo(() => { return prepScreens({ mlb: processedMLBData }) }, [processedMLBData]);

    const [activeScreen, setActiveScreen] = useState(0);
    const activeScreenData = useMemo(() => { return screensData[activeScreen] }, [activeScreen]);
    setTimeout(() => {
        if (activeScreen === screensData.length - 1) {
            setActiveScreen(0);
        }
        else setActiveScreen(activeScreen + 1);
    }, 5000);

    if (!activeScreenData) return null;

    return (
        <div className="score-ticker">
            <div className="league-name">{activeScreenData.league}</div>
            {activeScreenData.games.map((game) => { return <MLBScoreBox gameData={game} /> })}
        </div>)

}

export default ScoreTicker;