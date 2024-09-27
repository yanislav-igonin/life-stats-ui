import { DateTime } from "luxon";

export function formatDate(stringDate: string) {
	return DateTime.fromISO(stringDate).toLocaleString(DateTime.DATETIME_MED);
}

export function diffInHours(date1: string, date2: string) {
	const date1DateTime = DateTime.fromISO(date1);
	const date2DateTime = DateTime.fromISO(date2);
	return date1DateTime.diff(date2DateTime, "hours").hours;
}

export function toFixed(num: number, digits: number) {
	return num.toFixed(digits);
}
