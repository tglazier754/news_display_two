
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

import { useMemo, useState, useEffect } from "react";
import { processMLBData } from "../../controllers/mlbController";
import { prepScreens } from "../../controllers/scoreTickerController";
import MLBScoreBox from "./MLBScoreBox";
import LeagueIcon from "./LeagueIcon";
import "./scoreTicker.css";

//TODO : Recalculate ticker width based on screen width

export const ScoreTicker = ({ mlb }) => {

    //the actual data that is processed is memoized so that it does not get recomputed on re-render
    const processedMLBData = useMemo(() => { return processMLBData(mlb); }, [mlb])
    //TODO: recalculate this on screen resize
    const screensData = useMemo(() => { return prepScreens({ mlb: processedMLBData }) }, [processedMLBData]);

    //this is using state so that we can trigger the re-render
    const [activeScreen, setActiveScreen] = useState(0);

    let animationTimer;

    useEffect(() => {
        //TODO: add screen size handlers here

        //timer for changing the active screen
        //TODO: add proper animation classes here to fade or slide in/out
        animationTimer = setTimeout(() => {
            if (activeScreen === screensData.length - 1) {
                setActiveScreen(0);
            }
            else setActiveScreen(activeScreen + 1);
        }, 5000);

        return () => {
            clearTimeout(animationTimer);
        }

    }, []);


    if (!screensData[activeScreen]) return null;

    //TODO: set compact to true for the box scores on small screens
    //giving the score ticker a unique key means that it will be re-drawn on each re-render
    return (
        <div key={`score-ticker-active-screen-${activeScreen}`} className="score-ticker">
            <div className="league-name-container"><LeagueIcon league={screensData[activeScreen].league} /></div>
            <div className="games">
                {screensData[activeScreen].games.map((game) => { return <MLBScoreBox key={`mlb-game-${game.guid}`} gameData={game} /> })}
            </div>
        </div>)

}

export default ScoreTicker;