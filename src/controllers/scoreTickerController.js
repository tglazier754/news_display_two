
//output an array of screen objects
/*
screen: {league:"league", games:[]}
*/

//feeds is an object with key-value pairs of the form leage_name:games_array
export const prepScreens = (feeds, maxScreenSize = 4) => {

    const screens = [];


    const leagues = Object.keys(feeds);

    leagues.forEach((league) => {

        //determine the optimal number of games per screen
        const feed = feeds[league];
        const screenSize = calculateOptimalScreenSize(feed.length, maxScreenSize);

        for (var i = 0; i < feed.length; i += screenSize) {
            const screen = { league: league, games: feed.slice(i, i + screenSize) }
            screens.push(screen);
        }

    })

    return screens;
}

//we want a zero leftover that is the highest divisble number
//if none is found, we want the value that gives us the highest leftover
const calculateOptimalScreenSize = (gamesCount, maxScreenSize) => {
    let highest = 1;
    let screenSize;
    if (gamesCount <= maxScreenSize) { return gamesCount; }
    else {
        for (var i = maxScreenSize; i > 1; i--) {
            const leftover = gamesCount % i;
            const highestLeftover = gamesCount % highest;

            if (leftover === 0) {
                screenSize = i;
                break;
            }
            if (leftover > highestLeftover) {
                highest = i;
            }
        }
        if (!screenSize) screenSize = highest;
        return screenSize;
    }
}