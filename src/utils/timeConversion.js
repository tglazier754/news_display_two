
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//convenience method to get the desired values from a date string or date object
export const getDateSplit = (dateVal) => {

    const date = (typeof dateVal === "string") ? new Date(dateVal) : dateVal;

    if (date)
        return { year: date.getFullYear(), monthCode: date.getMonth(), month: months[date.getMonth()], dayOfWeekCode: date.getDay(), dayOfMonth: date.getDate(), day: days[date.getDay()] }
    return null;
}

export const getFormattedDateString = (dateVal) => {
    const date = (typeof dateVal === "string") ? new Date(dateVal) : dateVal;

    if (date)
        return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    return null;
}

export const getFormattedTimeString = (dateVal) => {
    const date = (typeof dateVal === "string") ? new Date(dateVal) : dateVal;

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
    const date = (typeof dateVal === "string") ? new Date(dateVal) : dateVal;

    if (date) {
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - date.getTime();
        const minutes = (timeDiff / (1000 * 60)) % 60;
        const hours = (timeDiff / (1000 * 60 * 60));
        const days = (timeDiff / (1000 * 60 * 60 * 24));

        if (hours < 1) return `Published ${minutes} minutes ago`;
        if (hours > 1 && hours < 24) return `Published ${hours} hours ago`;
        if (Math.floor(days) === 1) return `Published 1 day ago`;
        return `Published ${days} days ago`;

    }
    return null;
}