
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

        for (var i = 0; i < feed.length; i += 3) {

            const screen = { league: league, games: feed.slice(i, i + screenSize) }
            screens.push(screen);
        }

    })
    console.log(screens);
    return screens;
}

//we want a zero leftover that is the highest divisble number
//if none is found, we want the value that gives us the highest leftover
const calculateOptimalScreenSize = (gamesCount, maxScreenSize) => {
    let highest = 1;
    let screenSize;

    for (var i = maxScreenSize; i > 0; i--) {
        const leftover = gamesCount % i;
        const highestLeftover = gamesCount % highest;

        if (leftover === 0) {
            screenSize = i;
            break;
        }
        if (leftover > highestLeftover) {
            highest = highestLeftover;
        }
    }
    if (!screenSize) screenSize = highest;
    return screenSize;
}