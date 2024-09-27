import { httpClient, httpClientUnauthed } from "./httpClient";

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
export function getSleeps() {
	return httpClient
		.get<SuccessResponse<SleepData[]>>("sleep")
		.then(async (response) => {
			const data = await response.json();
			return data.data;
		});
}
