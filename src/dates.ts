import { differenceInHours, format } from "date-fns";

export function formatDate(stringDate: string) {
	return format(new Date(stringDate), "dd.MM.yyyy");
}

export function diffInHours(date1: string, date2: string) {
	return differenceInHours(new Date(date1), new Date(date2));
}

export function toFixed(num: number, digits: number) {
	return num.toFixed(digits);
}
