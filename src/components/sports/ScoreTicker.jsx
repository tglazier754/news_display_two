
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
import LeagueIcon from "./LeagueIcon";
import "./scoreTicker.css";


export const ScoreTicker = ({ mlb }) => {

    //the actual data that is processed is memoized so that it does not get recomputed on re-render
    const processedMLBData = useMemo(() => { return processMLBData(mlb); }, [mlb])
    const screensData = useMemo(() => { return prepScreens({ mlb: processedMLBData }) }, [processedMLBData]);

    //this is using state so that we can trigger the re-render
    const [activeScreen, setActiveScreen] = useState(0);
    const activeScreenData = useMemo(() => { return screensData[activeScreen] }, [activeScreen]);

    //this could be placed into a use effect with an empty dependency array so that we can nullify it on unmount
    //timer for changing the active screen
    const animationTimer = setTimeout(() => {
        if (activeScreen === screensData.length - 1) {
            setActiveScreen(0);
        }
        else setActiveScreen(activeScreen + 1);
    }, 5000);

    if (!activeScreenData) return null;

    //TODO: set compact to true for the box scores on small screens
    //TODO: Make the box scores class generic and have it determine which league to use
    //giving the score ticker a unique key means that it will be re-drawn on each re-render
    return (
        <div key={`score-ticker-active-screen-${activeScreen}`} className="score-ticker">
            <div className="league-name-container"><LeagueIcon league={activeScreenData.league} /></div>
            <div className="games">
                {activeScreenData.games.map((game) => { return <MLBScoreBox key={`mlb-game-${game.guid}`} gameData={game} /> })}
            </div>
        </div>)

}

export default ScoreTicker;