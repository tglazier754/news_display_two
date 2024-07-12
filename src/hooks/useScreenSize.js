import { useState, useEffect } from "react";

export const useScreenSize = () => {
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

    const [size, setSize] = useState([initialWidth, initialHeight])

    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}