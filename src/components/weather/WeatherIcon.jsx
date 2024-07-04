import React, { useRef, useEffect, useState } from "react";

const icons = {

}

export const WeatherIcon = ({ weatherCode }) => {

    const iconRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getIcon = async () => {
            setLoading(true);
            try {
                iconRef.current = (await import(`../../icons/weather/${weatherCode}`)).default
                setLoading(false);
            }
            catch (error) {
                setLoading(false);
            }
        }
        if (loading) {

            getIcon();
        }
    }, [weatherCode, loading]);

    if (iconRef.current) {
        const SVG = iconRef.current;
        return (
            <div className="weather-icon">
                <SVG />
            </div>)
    }

    return <p className="weather-code">{weatherCode}</p>

}