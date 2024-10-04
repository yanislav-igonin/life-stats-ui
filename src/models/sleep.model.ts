import { diffInHours, formatDate } from "../lib/dates";

export class Sleep {
	id: string;
	wakeUpAt: string;
	goToBedAt: string;
	quality: "very_bad" | "bad" | "meh" | "good" | "very_good";
	moodOfDay: "very_bad" | "bad" | "meh" | "good" | "very_good";

	constructor(data: {
		id: string;
		wakeUpAt: string;
		goToBedAt: string;
		quality: "very_bad" | "bad" | "meh" | "good" | "very_good";
		moodOfDay: "very_bad" | "bad" | "meh" | "good" | "very_good";
	}) {
		this.id = data.id;
		this.wakeUpAt = data.wakeUpAt;
		this.goToBedAt = data.goToBedAt;
		this.quality = data.quality;
		this.moodOfDay = data.moodOfDay;
	}

	get hoursSlept() {
		return diffInHours(this.wakeUpAt, this.goToBedAt);
	}

	get date() {
		return formatDate(this.wakeUpAt);
	}

	static getAverageHoursSlept(sleeps: Sleep[]) {
		const total = sleeps.reduce((acc, sleep) => acc + sleep.hoursSlept, 0);
		return total / sleeps.length;
	}
}
