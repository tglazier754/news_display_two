
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

import React, { useRef, useMemo, useState, useEffect } from "react";
import { processMLBData } from "../../controllers/mlbController";
import { prepScreens } from "../../controllers/scoreTickerController";
import { determineNextItem } from "../../utils/scoreTicker";
import MLBScoreBox from "./MLBScoreBox";
import LeagueIcon from "./LeagueIcon";
import "./scoreTicker.css";
import { useScreenSize } from "../../hooks/useScreenSize";
import { CSSTransition } from "react-transition-group";
//TODO : Handle the case of zero games

export const ScoreTicker = ({ mlb }) => {
    const [width, height] = useScreenSize();
    const animationInterval = useRef();
    const activeScreen = useRef(0);
    const dataEven = useRef();
    const dataOdd = useRef();

    const [animationCounter, setAnimationCounter] = useState(0);

    //the actual data that is processed is memoized so that it does not get recomputed on re-render
    const processedMLBData = useMemo(() => { return processMLBData(mlb); }, [mlb])
    //TODO: recalculate this on screen resize
    const screensData = useMemo(() => {
        const maxScreenCount = width < 600 ? 3 : 4;
        return prepScreens({ mlb: processedMLBData }, maxScreenCount)
    }, [processedMLBData, width, height]);


    const isCompact = useMemo(() => { return width < 1000 ? true : false }, [width]);

    useEffect(() => {
        if (screensData) {
            if (screensData.length > 1) {
                console.log("update screen");
                const updateScreen = () => {

                    const isEven = animationCounter % 2 === 0;
                    const next = determineNextItem(screensData.length, activeScreen.current);

                    if (isEven) {
                        dataEven.current = screensData[activeScreen.current];
                        dataOdd.current = screensData[next];
                    }
                    else {
                        dataOdd.current = screensData[activeScreen.current];
                        dataEven.current = screensData[next];
                    }
                    activeScreen.current = next;

                    setAnimationCounter(animationCounter + 1);
                }
                animationInterval.current = setTimeout(updateScreen, 5000);
            }
            else if (screensData.length === 1) {
                dataEven.current = screensData[0];
                if (animationCounter === 0) {
                    //we need to trigger a re-render so that the ref data is picked up
                    setAnimationCounter(2);
                }
            }
        }
        return () => {
            clearTimeout(animationInterval.current);
        }

    }, [screensData, animationCounter]);


    if (!(screensData && screensData.length)) return null;

    if (!(dataEven.current)) return null;

    //TODO: Left-align when there only a few items
    //giving the score ticker a unique key means that it will be completely re-drawn on each re-render
    return (
        <div className="score-ticker">
            <CSSTransition in={animationCounter % 2 === 0} timeout={0} classNames="my-node">
                <div key={`score-ticker-active-screen-${animationCounter}`} className="score-ticker-screen">
                    <div className="league-name-container"><LeagueIcon league={dataEven.current.league} /></div>
                    <div className="games">
                        {dataEven.current.games.map((game) => { return <MLBScoreBox compact={isCompact} key={`mlb-game-${game.guid}`} gameData={game} /> })}
                    </div>
                </div>
            </CSSTransition>
            {dataOdd.current ?
                <CSSTransition in={animationCounter % 2 !== 0} timeout={0} classNames="my-node">
                    <div key={`score-ticker-active-screen-${animationCounter + 1}`} className="score-ticker-screen">
                        <div className="league-name-container"><LeagueIcon league={dataOdd.current.league} /></div>
                        <div className="games">
                            {dataOdd.current.games.map((game) => { return <MLBScoreBox compact={isCompact} key={`mlb-game-${game.guid}`} gameData={game} /> })}
                        </div>
                    </div>
                </CSSTransition>
                : null}

        </div>
    )

}

export default ScoreTicker;