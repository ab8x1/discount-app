const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
};

export default function timestampToDate(timestamp: number){
    return new Date(timestamp).toLocaleDateString("en-GB", dateOptions);
}