import { useEffect, useMemo, useState } from "react";
import { getFormattedDateString } from "../../utils/timeConversion";
import { ForecastListItem } from "./ForecastListItem";
import { WeatherIcon } from "./WeatherIcon";
import "./weather.css";
import { processWeatherData } from "../../controllers/weatherController";

export const Weather = ({ data }) => {

    const processedWeatherData = useMemo(() => { return processWeatherData(data); }, [data]);
    const currentDate = getFormattedDateString(new Date());

    if (!processedWeatherData || !Object.keys(processedWeatherData).length) return <p>loading...</p>;


    return (
        <div id="weather-widget">
            <div id="current-weather" className="current-weather">

                <div className="weather-icon-container">
                    <WeatherIcon weatherCode={processedWeatherData.current.weather_code} />
                </div>
                <div className="header-section">
                    <span className="weather-header">{currentDate}</span>
                    <p className="temp">{processedWeatherData.current.temperature}{processedWeatherData.units}</p>
                </div>
            </div>
            <div id="forecast-container">
                {processedWeatherData.forecast.map((forecast) => {
                    return <ForecastListItem key={`forecast-line-item-${forecast.date}`} forecast={forecast} units={processedWeatherData.units} />
                })}
            </div>

        </div>)
}