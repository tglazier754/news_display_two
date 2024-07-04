//converting statsapi.mlb data to usable game data

export const processMLBData = (data) => {

    let games = [];

    //TODO: Check if data is valid
    if (data) {
        games = data.dates[0].games.map((game) => {
            const gameObj = {};
            gameObj.type = "mlb";
            gameObj.date = game.gameDate;
            gameObj.venue = game.venue.name;
            gameObj.status = game.status.abstractGameState;
            gameObj.homeTeam = { name: game.teams.home.team.name, record: game.teams.home.leagueRecord, score: game.teams.home.score || null }
            gameObj.awayTeam = { name: game.teams.away.team.name, record: game.teams.away.leagueRecord, score: game.teams.away.score || null }
            return gameObj;
        });

    }

    return games;
}