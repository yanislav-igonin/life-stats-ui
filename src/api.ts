import { httpClient, httpClientUnauthed } from "./httpClient";
import { subWeeks } from "date-fns";
import type { Sleep } from "./models/sleep.model";
import { BoozeListElement } from "./models/booze.model";

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
		.get<SuccessResponse<SleepData[]>>("sleep/list", {
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
		.post<SuccessResponse<SleepData>>("sleep/save", {
			json: body,
		})
		.then(async (response) => {
			const data = await response.json();
			return data.data;
		});
}

export type BoozeData = {
	id: number;
	createdAt: string;
	quantity: "low" | "medium" | "high";
};
export function getBoozes(dates: DateRange | undefined) {
	const fromDate =
		dates?.from?.toISOString() ?? subWeeks(new Date(), 2).toISOString();
	const toDate = dates?.to?.toISOString() ?? new Date().toISOString();
	return httpClient
		.get<SuccessResponse<BoozeData[]>>("booze/list", {
			searchParams: {
				from: fromDate,
				to: toDate,
			},
		})
		.then(async (response) => {
			const data = await response.json();
			return data.data.map((data) => new BoozeListElement(data));
		});
}

export function getBooze(id: number) {
	return httpClient
		.get<SuccessResponse<BoozeData>>(`booze/${id}`)
		.then(async (response) => {
			const data = await response.json();
			return data.data;
		});
}

export function saveBooze(booze: BoozeData) {
	const body = {
		id: booze.id,
		createdAt: booze.createdAt,
		quantity: booze.quantity,
	};
	return httpClient
		.post<SuccessResponse<BoozeData>>("booze/save", {
			json: body,
		})
		.then(async (response) => {
			const data = await response.json();
			return data.data;
		});
}
