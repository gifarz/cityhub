import { format } from 'date-fns';

export const todayFormattedDate = () => {
    const date = new Date();
    const formattedDate = format(date, 'yyyy-MM-dd');

    return formattedDate
}

// sample data 2025-01-10T07:30:00+07:00
export const formattedDate = (isoDate) => {
    const formattedDate = format(new Date(isoDate), "yyyy-MM-dd HH:mm:ss");

    return formattedDate
}