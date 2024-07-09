import { getTeamAbbreviation } from "../../utils/sportsTeams";
import { getFormattedTimeString } from "../../utils/timeConversion";
import "./MLBScoreBox.css";

export const MLBScoreBox = ({ gameData, compact = false }) => {


    //TODO: Add a helper function to link full team names to abbreviated names
    //TODO: Implement the logo as a css background class

    const gameStartTime = getFormattedTimeString(gameData.date);
    const gameStatus = gameData.status === "Final" ? gameData.status : gameStartTime;
    const awayTeamAbbrev = getTeamAbbreviation(gameData.awayTeam.name);
    const homeTeamAbbrev = getTeamAbbreviation(gameData.homeTeam.name);

    return (
        <div className={`mlb-score-box ${compact ? "compact" : ""}`}>
            <div className="game-status">{gameStatus}</div>
            <div className="scores-container">
                <div className="team-info away-team">
                    <div className={`sports-logo ${awayTeamAbbrev}`} style={{ backgroundImage: `url(/mlb/${awayTeamAbbrev}.png)` }}></div>
                    <div className="team-name"><span>{compact ? awayTeamAbbrev.toUpperCase() : gameData.awayTeam.name}</span></div>
                    <div className="team-score"><span>{gameData.awayTeam.score}</span></div>
                </div>
                <div className="team-info home-team">
                    <div className={`sports-logo ${homeTeamAbbrev}`} style={{ backgroundImage: `url(/mlb/${homeTeamAbbrev}.png)` }}></div>
                    <div className="team-name"><span>{compact ? homeTeamAbbrev.toUpperCase() : gameData.homeTeam.name}</span></div>
                    <div className="team-score"><span>{gameData.homeTeam.score}</span></div>
                </div>
            </div>
        </div >
    );
}

export default MLBScoreBox;