import type { DateRange } from "react-day-picker";
import { httpClient, httpClientUnauthed } from "./httpClient";
import { subWeeks } from "date-fns";

type SuccessResponse<T> = {
	data: T;
	ok: true;
};

export function auth(authToken?: string) {
	if (!authToken) {
		return Promise.reject(new Error("No auth token provided"));
	}
	return httpClientUnauthed.get("auth", {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
}

export type SleepData = {
	id: string;
	wakeUpAt: string;
	goToBedAt: string;
	quality: "very_bad" | "bad" | "meh" | "good" | "very_good";
};
export function getSleeps({ from, to }: DateRange) {
	const fromDate = from?.toISOString() ?? subWeeks(new Date(), 2).toISOString();
	const toDate = to?.toISOString() ?? new Date().toISOString();
	return httpClient
		.get<SuccessResponse<SleepData[]>>("sleep", {
			searchParams: {
				from: fromDate,
				to: toDate,
			},
		})
		.then(async (response) => {
			const data = await response.json();
			return data.data;
		});
}
