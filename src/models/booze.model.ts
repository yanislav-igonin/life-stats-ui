import { formatDate } from "../lib/dates";
import type { DateLike } from "../lib/dates";

export class Booze {
	id: string;
	createdAt: Date;
	quantity: "low" | "medium" | "high";

	readonly quantityEmojiMap = {
		low: "🤤",
		medium: "🥴",
		high: "🤢",
	};

	readonly quantityMap = {
		low: 1,
		medium: 2,
		high: 3,
	};

	constructor(data: {
		id: string;
		createdAt: DateLike;
		quantity: "low" | "medium" | "high";
	}) {
		this.id = data.id;
		this.createdAt = new Date(data.createdAt);
		this.quantity = data.quantity;
	}

	get date() {
		if (!this.createdAt) {
			return "";
		}
		return formatDate(this.createdAt);
	}

	get quantityNumber() {
		return this.quantityMap[this.quantity];
	}

	static getAverageQuantity(boozes: Booze[]) {
		const total = boozes.reduce((acc, booze) => acc + booze.quantityNumber, 0);
		return total / boozes.length;
	}
}
