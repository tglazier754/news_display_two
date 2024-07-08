import { getTeamAbbreviation } from "../../utils/sportsTeams";
import { getFormattedTimeString } from "../../utils/timeConversion";
import "./MLBScoreBox.css";

export const MLBScoreBox = ({ gameData }) => {


    //TODO: Add a helper function to link full team names to abbreviated names
    //TODO: Implement the logo as a css background class

    const gameStartTime = getFormattedTimeString(gameData.date);
    const gameStatus = gameData.status === "Final" ? gameData.status : "";
    const awayTeamAbbrev = getTeamAbbreviation(gameData.awayTeam.name);
    const homeTeamAbbrev = getTeamAbbreviation(gameData.homeTeam.name);

    return (
        <div className="mlb-score-box">
            <div className="game-status">{gameStatus}</div>
            <div className="game-time">{gameStartTime}</div>
            <div className="away-team">
                <div className={`logo ${awayTeamAbbrev}`} style={{ backgroundImage: `url(/mlb/${awayTeamAbbrev})` }}></div>
                <div className="team-name">{gameData.awayTeam.name}</div>
                <div className="team-score">{gameData.awayTeam.score}</div>
                <div className="team-record">{`${gameData.awayTeam.record.wins} - ${gameData.awayTeam.record.losses}`}</div>
            </div>
            <div className="home-team">
                <div className={`logo ${homeTeamAbbrev}`}></div>
                <div className="team-name">{gameData.homeTeam.name}</div>
                <div className="team-score">{gameData.homeTeam.score}</div>
                <div className="team-record">{`${gameData.homeTeam.record.wins} - ${gameData.homeTeam.record.losses}`}</div>
            </div>
        </div >
    );
}

export default MLBScoreBox;