import { differenceInMinutes, format } from "date-fns";
import { toFixed } from "./numbers";

export function formatDate(stringDate: string) {
	return format(new Date(stringDate), "dd.MM.yyyy");
}

export function diffInHours(date1: string, date2: string) {
	if (!date1 || !date2) {
		return 0;
	}
	return toFixed(differenceInMinutes(new Date(date1), new Date(date2)) / 60, 1);
}
