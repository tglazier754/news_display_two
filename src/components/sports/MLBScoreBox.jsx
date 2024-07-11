import { getTeamAbbreviation } from "../../utils/sportsTeams";
import { getFormattedTimeString } from "../../utils/timeConversion";
import "./MLBScoreBox.css";

export const MLBScoreBox = ({ gameData, compact = false }) => {


    //TODO: Add a helper function to link full team names to abbreviated names
    //TODO: Implement the logo as a css background class

    const gameStartTime = getFormattedTimeString(gameData.date);
    const gameStatus = gameData.status === "Preview" ? gameStartTime : gameData.status;
    const awayTeamAbbrev = getTeamAbbreviation(gameData.awayTeam.name);
    const homeTeamAbbrev = getTeamAbbreviation(gameData.homeTeam.name);

    const awayTeamScore = gameData.status === "Preview" ? null : gameData.awayTeam.score || 0;
    const homeTeam = gameData.status === "Preview" ? null : gameData.homeTeam.score || 0;

    return (
        <div className={`mlb-score-box ${compact ? "compact" : ""}`}>
            <div className="game-status">{gameStatus}</div>
            <div className="scores-container">
                <div className="team-info away-team">
                    <div className={`sports-logo ${awayTeamAbbrev}`} style={{ backgroundImage: `url(/mlb/${awayTeamAbbrev}.png)` }}></div>
                    <div className="team-name"><span>{compact ? awayTeamAbbrev.toUpperCase() : gameData.awayTeam.name}</span></div>
                    <div className="team-score"><span>{awayTeamScore}</span></div>
                </div>
                <div className="team-info home-team">
                    <div className={`sports-logo ${homeTeamAbbrev}`} style={{ backgroundImage: `url(/mlb/${homeTeamAbbrev}.png)` }}></div>
                    <div className="team-name"><span>{compact ? homeTeamAbbrev.toUpperCase() : gameData.homeTeam.name}</span></div>
                    <div className="team-score"><span>{homeTeam}</span></div>
                </div>
            </div>
        </div >
    );
}

export default MLBScoreBox;