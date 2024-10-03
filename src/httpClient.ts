import ky from "ky";
import { config } from "./config";

export const httpClientUnauthed = ky.create({
	prefixUrl: config.apiUrl,
	throwHttpErrors: true,
});

export const httpClient = ky.create({
	prefixUrl: config.apiUrl,
	throwHttpErrors: true,
	hooks: {
		beforeRequest: [
			async (request) => {
				const authToken = localStorage.getItem("authToken");
				if (authToken) {
					request.headers.set("Authorization", authToken);
				}
			},
		],
	},
});
