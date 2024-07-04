
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