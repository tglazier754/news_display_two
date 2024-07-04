
import { getDateSplit } from "../../utils/timeConversion";
import { WeatherIcon } from "./WeatherIcon";


export const ForecastListItem = (props) => {
    const { forecast, units } = props;
    const dateSplit = getDateSplit(forecast.date);
    console.log(forecast);
    return (
        <div key={`daily-forecast-entry-${forecast.date}`} className="daily-forecast">
            <div className="daily-forecast-wrapper">
                <div className="weather-icon-container">
                    <WeatherIcon weatherCode={forecast.weather_code} />
                </div>
                <div className="info-section">
                    <span className="weather-header">{dateSplit.day}</span>
                    <div className="tempatature-section">
                        <span className="temp">{`High: ${forecast.high}${units}`}</span>
                        <span className="temp">{`Low: ${forecast.low}${units}`}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}