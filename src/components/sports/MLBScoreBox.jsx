
export const MLBScoreBox = ({ gameData }) => {


    //TODO: Add a helper function to link full team names to abbreviated names
    //TODO: Implement the logo as a css background class

    return (
        <div className="mlb-score-box">
            <div className="game-status">{gameData.status}</div>
            <div className="game-time">{gameData.date}</div>
            <div className="away-team">
                <div className="logo"></div>
                <div className="team-name">{gameData.awayTeam.name}</div>
                <div className="team-score">{gameData.awayTeam.score}</div>
                <div className="team-record">{`${gameData.awayTeam.record.wins} - ${gameData.awayTeam.record.losses}`}</div>
            </div>
            <div className="home-team">
                <div className="logo"></div>
                <div className="team-name">{gameData.homeTeam.name}</div>
                <div className="team-score">{gameData.homeTeam.score}</div>
                <div className="team-record">{`${gameData.homeTeam.record.wins} - ${gameData.homeTeam.record.losses}`}</div>
            </div>
        </div>
    );
}

export default MLBScoreBox;