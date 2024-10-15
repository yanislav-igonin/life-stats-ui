import { diffInHours, formatDate } from "../lib/dates";

export class Sleep {
	id: string;
	wakeUpAt: Date;
	goToBedAt: Date;
	quality: "very_bad" | "bad" | "meh" | "good" | "very_good";
	moodOfDay: "very_bad" | "bad" | "meh" | "good" | "very_good";

	private readonly qualityMap = {
		very_bad: 1,
		bad: 2,
		meh: 3,
		good: 4,
		very_good: 5,
	};

	private readonly moodMap = {
		very_bad: 1,
		bad: 2,
		meh: 3,
		good: 4,
		very_good: 5,
	};

	readonly qualityEmojiMap = {
		very_bad: "😡",
		bad: "😠",
		meh: "🤨",
		good: "😌",
		very_good: "🥹",
	};

	readonly moodEmojiMap = {
		very_bad: "😡",
		bad: "😠",
		meh: "🤨",
		good: "😌",
		very_good: "🥹",
	};

	constructor(data: {
		id: string;
		wakeUpAt: string;
		goToBedAt: string;
		quality: "very_bad" | "bad" | "meh" | "good" | "very_good";
		moodOfDay: "very_bad" | "bad" | "meh" | "good" | "very_good";
	}) {
		this.id = data.id;
		this.wakeUpAt = new Date(data.wakeUpAt);
		this.goToBedAt = new Date(data.goToBedAt);
		this.quality = data.quality;
		this.moodOfDay = data.moodOfDay;
	}

	get hoursSlept() {
		return diffInHours(this.wakeUpAt, this.goToBedAt);
	}

	get date() {
		if (!this.wakeUpAt) {
			return "";
		}
		return formatDate(this.wakeUpAt);
	}

	get qualityNumber() {
		return this.qualityMap[this.quality];
	}

	get moodNumber() {
		return this.moodMap[this.moodOfDay];
	}

	get qualityEmoji() {
		return this.qualityEmojiMap[this.quality];
	}

	get moodEmoji() {
		return this.moodEmojiMap[this.moodOfDay];
	}

	static getAverageHoursSlept(sleeps: Sleep[]) {
		const total = sleeps.reduce((acc, sleep) => acc + sleep.hoursSlept, 0);
		return total / sleeps.length;
	}

	static getAverageSleepQuality(sleeps: Sleep[]) {
		const total = sleeps.reduce((acc, sleep) => acc + sleep.qualityNumber, 0);
		return total / sleeps.length;
	}

	static getAverageMoodOfDay(sleeps: Sleep[]) {
		const total = sleeps.reduce((acc, sleep) => acc + sleep.moodNumber, 0);
		return total / sleeps.length;
	}
}
