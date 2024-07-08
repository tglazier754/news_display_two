

export const LeagueIcon = ({ league }) => {

    console.log(league);

    return (
        <div>
            <div className="league-name">{league}</div>
            <div className="league-icon" style={{ backgroundImage: `url(/${league}.png)` }} />
        </div>
    )
}

export default LeagueIcon;