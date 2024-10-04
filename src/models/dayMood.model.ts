export class SleepQuality {
	date: string;
	quality: "very_bad" | "bad" | "meh" | "good" | "very_good";

	private readonly moodMap = {
		very_bad: 1,
		bad: 2,
		meh: 3,
		good: 4,
		very_good: 5,
	};

	constructor(data: {
		date: string;
		quality: "very_bad" | "bad" | "meh" | "good" | "very_good";
	}) {
		this.date = data.date;
		this.quality = data.quality;
	}

	get qualityNumber() {
		return this.moodMap[this.quality];
	}
}
