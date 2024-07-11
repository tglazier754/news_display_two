
import { getDateSplit } from "../../utils/timeConversion";
import { WeatherIcon } from "./WeatherIcon";
import "./ForecastListItem.css";


export const ForecastListItem = (props) => {
    const { forecast, units } = props;
    const dateSplit = getDateSplit(forecast.date);

    return (
        <div key={`daily-forecast-entry-${forecast.date}`} className="daily-forecast">
            <div className="daily-forecast-wrapper">
                <div className="weather-icon-container">
                    <WeatherIcon weatherCode={forecast.weather_code} />
                </div>
                <div className="temperature-section">
                    <span className="temp">
                        <span className="high">{`${forecast.high}${units}/`}</span>
                        <span className="low">{`${forecast.low}${units}`}</span>
                    </span>
                </div>

                <div className="day-section">
                    <span className="date">{dateSplit.day}</span>
                </div>
            </div>

        </div>
    )
}