import type { Sleep } from "./sleep.model";

export class MoodForDay {
	date: string;
	mood: "very_bad" | "bad" | "meh" | "good" | "very_good";

	private readonly moodMap = {
		very_bad: 1,
		bad: 2,
		meh: 3,
		good: 4,
		very_good: 5,
	};

	constructor(data: Sleep) {
		this.date = data.date;
		this.mood = data.moodOfDay;
	}

	get moodNumber() {
		return this.moodMap[this.mood];
	}
}
