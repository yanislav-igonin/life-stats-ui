import { httpClient, httpClientUnauthed } from "./httpClient";
import { subWeeks } from "date-fns";
import type { Sleep } from "./models/sleep.model";

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
	moodOfDay: "very_bad" | "bad" | "meh" | "good" | "very_good";
};
export type DateRange = {
	from: Date | null;
	to: Date | null;
};
export function getSleeps(dates: DateRange | undefined) {
	const fromDate =
		dates?.from?.toISOString() ?? subWeeks(new Date(), 2).toISOString();
	const toDate = dates?.to?.toISOString() ?? new Date().toISOString();
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

export function getSleep(id: number) {
	return httpClient
		.get<SuccessResponse<SleepData>>(`sleep/${id}`)
		.then(async (response) => {
			const data = await response.json();
			return data.data;
		});
}

export function saveSleep(sleep: Sleep) {
	const body = {
		id: sleep.id,
		wakeUpAt: sleep.wakeUpAt,
		goToBedAt: sleep.goToBedAt,
		quality: sleep.quality,
		moodOfDay: sleep.moodOfDay,
	};
	return httpClient
		.post<SuccessResponse<SleepData>>("sleep", {
			json: body,
		})
		.then(async (response) => {
			const data = await response.json();
			return data.data;
		});
}
