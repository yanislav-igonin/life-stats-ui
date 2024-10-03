import { diffInHours, formatDate } from "../dates";

export class Sleep {
	id: string;
	wakeUpAt: string;
	goToBedAt: string;
	quality: "very_bad" | "bad" | "meh" | "good" | "very_good";

	constructor(data: {
		id: string;
		wakeUpAt: string;
		goToBedAt: string;
		quality: "very_bad" | "bad" | "meh" | "good" | "very_good";
	}) {
		this.id = data.id;
		this.wakeUpAt = data.wakeUpAt;
		this.goToBedAt = data.goToBedAt;
		this.quality = data.quality;
	}

	get hoursSlept() {
		return diffInHours(this.wakeUpAt, this.goToBedAt);
	}

	get date() {
		return formatDate(this.wakeUpAt);
	}
}
