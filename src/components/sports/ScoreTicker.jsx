
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

import { useRef, useMemo, useState, useEffect } from "react";
import { processMLBData } from "../../controllers/mlbController";
import { prepScreens } from "../../controllers/scoreTickerController";
import MLBScoreBox from "./MLBScoreBox";
import LeagueIcon from "./LeagueIcon";
import "./scoreTicker.css";
import { useScreenSize } from "../../hooks/useScreenSize";

//TODO : Recalculate ticker width based on screen width

export const ScoreTicker = ({ mlb }) => {

    const [width, height] = useScreenSize();
    const animationInterval = useRef();


    //this is using state so that we can trigger the re-render
    const [activeScreen, setActiveScreen] = useState(0);

    //the actual data that is processed is memoized so that it does not get recomputed on re-render
    const processedMLBData = useMemo(() => { return processMLBData(mlb); }, [mlb])
    //TODO: recalculate this on screen resize
    const screensData = useMemo(() => {
        const maxScreenCount = width < 600 ? 3 : 4;
        return prepScreens({ mlb: processedMLBData }, maxScreenCount)
    }, [processedMLBData, width, height]);

    const isCompact = useMemo(() => { return width < 1000 ? true : false }, [width]);


    useEffect(() => {
        //timer for changing the active screen
        //TODO: add proper animation classes here to fade or slide in/out
        const updateScreen = () => {
            if (activeScreen === screensData.length - 1) {
                setActiveScreen(0);
            }
            else { setActiveScreen(activeScreen + 1); }
        }
        animationInterval.current = setTimeout(updateScreen, 5000);
        return () => {
            clearTimeout(animationInterval.current);
        }

    }, [activeScreen]);


    if (!screensData[activeScreen]) return null;

    //TODO: set compact to true for the box scores on small screens
    //giving the score ticker a unique key means that it will be re-drawn on each re-render
    return (
        <div key={`score-ticker-active-screen-${activeScreen}`} className="score-ticker">
            <div className="league-name-container"><LeagueIcon league={screensData[activeScreen].league} /></div>
            <div className="games">
                {screensData[activeScreen].games.map((game) => { return <MLBScoreBox compact={isCompact} key={`mlb-game-${game.guid}`} gameData={game} /> })}
            </div>
        </div>)

}

export default ScoreTicker;