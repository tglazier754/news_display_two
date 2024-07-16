

const mlbTeams = {
    "arizona-diamondbacks": "ari",
    "atlanta-braves": "atl",
    "baltimore-orioles": "bal",
    "boston-red-sox": "bos",
    "chicago-cubs": "chc",
    "chicago-white-sox": "cws",
    "cincinnati-reds": "cin",
    "cleveland-guardians": "cle",
    "colorado-rockies": "col",
    "detroit-tigers": "det",
    "houston-astros": "hou",
    "kansas-city-royals": "kc",
    "los-angeles-angels": "laa",
    "los-angeles-dodgers": "lad",
    "miami-marlins": "mia",
    "milwaukee-brewers": "mil",
    "minnesota-twins": "min",
    "new-york-mets": "nym",
    "new-york-yankees": "nyy",
    "oakland-athletics": "oak",
    "philadelphia-phillies": "phi",
    "pittsburgh-pirates": "pit",
    "san-diego-padres": "sd",
    "san-francisco-giants": "sf",
    "seattle-mariners": "sea",
    "st-louis-cardinals": "stl",
    "tampa-bay-rays": "tb",
    "texas-rangers": "tex",
    "toronto-blue-jays": "tor",
    "washington-nationals": "wsh",
    "national-league-all-stars": "nl",
    "american-league-all-stars": "al"
}


export const getTeamAbbreviation = (teamName) => {
    const clean = teamName.toLowerCase().replaceAll(".", "").replaceAll(" ", "-");
    return mlbTeams[clean];
}
