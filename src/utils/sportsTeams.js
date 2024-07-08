

const mlbTeams = {
    "arizona-diamondbacks": "ari",
    "atlanta-braves": "atl",
    "baltimore-oriols": "bal",
    "boston-red-sox": "bos",
    "chicago-cubs": "chc",
    "chicago-white-sox": "cws",
    "cincinatti-reds": "cin",
    "cleveland-guardians": "cle",
    "colorado-rockies": "col",
    "detroit-tigers:": "det",
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
    "san-fransisco-giants": "sf",
    "seattle-mariners": "sea",
    "st-louis-cardinals": "stl",
    "tampa-bay-rays": "tb",
    "texas-rangers": "tex",
    "toronto-blue-jays": "tor",
    "washington-nationals": "wsh"
}


export const getTeamAbbreviation = (teamName) => {
    return mlbTeams[teamName.toLowerCase().replace(" ", "-").replace(".", "")];
}