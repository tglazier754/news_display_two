export const processWeatherData = (data, days = 6) => {
    /*process the weather data here to the standard format
    as mentioned in app.js, this would be moved to a backend
    that way, the frontend does not need to be updated if we need to swap out feed sources
    */
    //TODO: Check if data is valid
    const outputData = {};
    if (data) {
        outputData.units = data.current_units.temperature_2m;
        outputData.current = { temperature: data.current.temperature_2m, weather_code: data.current.weather_code };
        outputData.forecast = [];
        const dailyData = data.daily;
        for (var i = 0; i < days; i++) {
            const forecastData = { date: dailyData.time[i], high: dailyData.temperature_2m_max[i], low: dailyData.temperature_2m_min[i], weather_code: dailyData.weather_code[i] }
            outputData.forecast.push(forecastData);
        }
        console.log(outputData);
    }

    return outputData;
}