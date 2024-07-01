import { useEffect } from "react";
import { useWeatherController } from "../../hooks/useWeatherController"


export const Weather = ({ data }) => {

    const { processedWeatherData } = useWeatherController(data);


    useEffect(() => { console.log(processedWeatherData) }, [processedWeatherData]);

    if (!processedWeatherData) return null;


    return (
        <div id="weather-widget">
            <div id="current">
                <p className="header">Current</p>
                <p className="temp">{processedWeatherData.current.temperature}{processedWeatherData.units}</p>
                <p className="weather-code">{processedWeatherData.current.weather_code}</p>
            </div>
            <div id="forecast">
                {processedWeatherData.forecast.map((forecast) => {
                    return (
                        <div className="daily-forecast">
                            <p className="header">{forecast.date}</p>
                            <p className="temp">{`High: ${forecast.high}`}</p>
                            <p className="temp">{`Low: ${forecast.low}`}</p>
                            <p className="weather-code">{forecast.weather_code}</p>
                        </div>
                    )
                })}
            </div>

        </div>)
}