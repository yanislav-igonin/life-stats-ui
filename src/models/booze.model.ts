import { formatDate } from "../lib/dates";
import type { DateLike } from "../lib/dates";

export class BoozeListElement {
	id: number;
	createdAt: Date;
	quantity: "none" | "low" | "medium" | "high";

	readonly quantityEmojiMap: { [key in BoozeListElement["quantity"]]: string } =
		{
			none: "🤷",
			low: "🤤",
			medium: "🥴",
			high: "🤢",
		};

	private readonly quantityMap: {
		[key in BoozeListElement["quantity"]]: number;
	} = {
		none: 0,
		low: 1,
		medium: 2,
		high: 3,
	};

	constructor(data: {
		id: number;
		createdAt: DateLike;
		quantity: BoozeListElement["quantity"];
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

	static getAverageQuantity(boozes: BoozeListElement[]) {
		const total = boozes.reduce((acc, booze) => acc + booze.quantityNumber, 0);
		return total / boozes.length;
	}
}

export class Booze extends BoozeListElement {
	quantity: Exclude<BoozeListElement["quantity"], "none">;

	constructor(data: {
		id: number;
		createdAt: DateLike;
		quantity: Booze["quantity"];
	}) {
		super(data);
		this.quantity = data.quantity;
	}
}
