import { differenceInMinutes, format } from "date-fns";
import { toFixed } from "./numbers";

export type DateLike = string | Date;

export function formatDate(date: string | Date) {
	return format(new Date(date), "dd.MM.yyyy");
}

export function diffInHours(date1: string | Date, date2: string | Date) {
	if (!date1 || !date2) {
		return 0;
	}
	return toFixed(differenceInMinutes(new Date(date1), new Date(date2)) / 60, 1);
}
