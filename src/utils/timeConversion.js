
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//convenience method to get the desired values from a date string or date object
export const getDateSplit = (dateVal) => {

    const date = (typeof dateVal === "string") ? new Date(prepDateString(dateVal)) : dateVal;

    if (date)
        return { year: date.getFullYear(), monthCode: date.getMonth(), month: months[date.getMonth()], dayOfWeekCode: date.getDay(), dayOfMonth: date.getDate(), day: days[date.getDay()] }
    return null;
}

export const getFormattedDateString = (dateVal) => {
    const date = (typeof dateVal === "string") ? new Date(prepDateString(dateVal)) : dateVal;

    if (date)
        return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    return null;
}

export const getFormattedTimeString = (dateVal) => {
    const date = (typeof dateVal === "string") ? new Date(prepDateString(dateVal)) : dateVal;

    if (date) {
        const hours = date.getHours();
        const hoursTwelve = hours > 12 ? hours - 12 : hours;
        const minutes = date.getMinutes();
        const minutesFixed = minutes < 10 ? `0${minutes}` : minutes;
        return `${hoursTwelve}:${minutesFixed}`
    }
    return null;
}

export const getFormattedDatePostedString = (dateVal) => {
    const date = (typeof dateVal === "string") ? new Date(prepDateString(dateVal)) : dateVal;

    if (date) {
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - date.getTime();
        const minutes = (timeDiff / (1000 * 60)) % 60;
        const hours = (timeDiff / (1000 * 60 * 60));
        const days = (timeDiff / (1000 * 60 * 60 * 24));

        if (hours < 1) return `Published ${Math.floor(minutes)} minutes ago`;
        if (hours > 1 && hours < 24) return `Published ${Math.floor(hours)} hours ago`;
        if (Math.floor(days) === 1) return `Published 1 day ago`;
        return `Published ${Math.floor(days)} days ago`;

    }
    return null;
}

const prepDateString = (dateString) => {
    /*this method might cause some problems, but date strings of the format YYYY-MM-DD
    are given a UTC time zone, and are calculated with the getDay function returning 
    one day less than expected. Changing the dashes to slashes makes it read correctly for some reason
    */
    if (dateString.lastIndexOf("T") !== -1) return dateString;
    else return dateString.replace(/-/g, '\/');
}