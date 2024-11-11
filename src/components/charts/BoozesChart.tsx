import { useState, useMemo } from "react";
import { BarChart } from "@mantine/charts";
import type { BarChartSeries } from "@mantine/charts";
import { Booze } from "@/models/booze.model";
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
function fillDatesGaps(boozes: Booze[]) {
	if (boozes.length === 0) {
		return boozes;
	}

	const copied = copy(boozes).map((booze) => new Booze(booze));
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
		return new Booze({
			id: copied[copied.length - 1].id + 1,
			createdAt: date,
			quantity: "none",
		});
	});

	return filled;
}

export function BoozesChart({ boozes }: { boozes: Booze[] }) {
	const [averageQuantity, setAverageQuantity] = useState<number | undefined>(
		undefined,
	);
	const [filledBoozes, setFilledBoozes] = useState<Booze[]>([]);
	useMemo(() => {
		setFilledBoozes(fillDatesGaps(boozes));
	}, [boozes]);
	useMemo(() => {
		setAverageQuantity(Booze.getAverageQuantity(filledBoozes));
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
