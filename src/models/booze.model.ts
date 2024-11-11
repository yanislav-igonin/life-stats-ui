import { formatDate } from "../lib/dates";
import type { DateLike } from "../lib/dates";

export class Booze {
	id: number;
	createdAt: Date;
	quantity: "none" | "low" | "medium" | "high";

	private readonly quantityEmojiMap: { [key in Booze["quantity"]]: string } = {
		none: "🤷",
		low: "🤤",
		medium: "🥴",
		high: "🤢",
	};

	private readonly quantityMap: { [key in Booze["quantity"]]: number } = {
		none: 0,
		low: 1,
		medium: 2,
		high: 3,
	};

	constructor(data: {
		id: number;
		createdAt: DateLike;
		quantity: Booze["quantity"];
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

	get quantityEmoji() {
		return this.quantityEmojiMap[this.quantity];
	}

	static getAverageQuantity(boozes: Booze[]) {
		const total = boozes.reduce((acc, booze) => acc + booze.quantityNumber, 0);
		return total / boozes.length;
	}
}
