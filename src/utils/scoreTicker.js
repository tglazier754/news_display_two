export const determineNextItem = (arrayLength, current) => {
    const next = current + 1;
    if (arrayLength) {
        if (next === arrayLength) return 0;
        else return next;
    }
    else return -1;
}