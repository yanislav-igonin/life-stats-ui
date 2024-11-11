import { useState, useMemo } from "react";
import { BarChart } from "@mantine/charts";
import type { BarChartSeries } from "@mantine/charts";
import { BoozeListElement } from "@/models/booze.model";
import { eachDayOfInterval } from "date-fns";
import { copy } from "@/lib/objects";
import { formatDate } from "@/lib/dates";

const series: BarChartSeries[] = [
	{
		label: "Количество",
		name: "quantityNumber",
		color: "black",
	},
];

/**
 * Function fills gaps in dates to make chart look better.
 */
function fillDatesGaps(boozes: BoozeListElement[]) {
	if (boozes.length === 0) {
		return boozes;
	}

	const copied = copy(boozes).map((booze) => new BoozeListElement(booze));
	const first = copied[0];
	const last = copied[copied.length - 1];
	const dates = eachDayOfInterval({
		start: first.createdAt,
		end: last.createdAt,
	});

	const filled = dates.map((date) => {
		const booze = copied.find((booze) => booze.date === formatDate(date));
		if (booze) {
			return booze;
		}
		return new BoozeListElement({
			id: copied[copied.length - 1].id + 1,
			createdAt: date,
			quantity: "none",
		});
	});

	return filled;
}

export function BoozesChart({ boozes }: { boozes: BoozeListElement[] }) {
	const [averageQuantity, setAverageQuantity] = useState<number | undefined>(
		undefined,
	);
	const [filledBoozes, setFilledBoozes] = useState<BoozeListElement[]>([]);
	useMemo(() => {
		setFilledBoozes(fillDatesGaps(boozes));
	}, [boozes]);
	useMemo(() => {
		setAverageQuantity(BoozeListElement.getAverageQuantity(filledBoozes));
	}, [filledBoozes]);

	return (
		<div>
			<BarChart
				data={filledBoozes}
				dataKey="date"
				series={series}
				h={400}
				yAxisProps={{
					mirror: true,
					ticks: [0, 1, 2, 3],
				}}
			/>

			{filledBoozes.length > 0 ? (
				<p>Среднее количество: {averageQuantity?.toFixed(1)}</p>
			) : null}
		</div>
	);
}
