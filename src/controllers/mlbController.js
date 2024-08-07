//converting statsapi.mlb data to usable game data


//TODO: for each game that is live, we need to pull the live game data so that we know what inning it's in
export const processMLBData = (data) => {

    let games = [];

    //TODO: Check if data is valid
    if (data && data.dates.length) {
        games = data.dates[0].games.map((game) => {
            const gameObj = {};
            gameObj.date = game.gameDate;
            gameObj.guid = game.gameGuid;
            gameObj.venue = game.venue.name;
            gameObj.status = game.status.abstractGameState;
            gameObj.homeTeam = { name: game.teams.home.team.name, record: game.teams.home.leagueRecord, score: game.teams.home.score || null }
            gameObj.awayTeam = { name: game.teams.away.team.name, record: game.teams.away.leagueRecord, score: game.teams.away.score || null }
            return gameObj;
        });

    }
    return games;
}