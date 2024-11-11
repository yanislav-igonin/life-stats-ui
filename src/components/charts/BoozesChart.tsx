import { useState, useMemo } from "react";
import { BarChart } from "@mantine/charts";
import type { BarChartSeries } from "@mantine/charts";
import { Flex } from "@/components/ui/Flex";
import { Booze } from "@/models/booze.model";
import {differenceInCalendarDays } from 'date-fns'

const series: BarChartSeries[] = [
	{
		label: "Количество",
		name: "quantityNumber",
		color: "red",
	},
];


/**
 * Function fills gaps in dates to make chart look better.
 * 
 */
function fillDatesGaps(boozes: Booze[]) {
	for (let i = 0; i < boozes.length - 1; i++) {
		const booze = boozes[i];
		const nextBooze = boozes[i + 1];
		const isMoreThanOneDay = differenceInCalendarDays(booze.date, nextBooze.date) > 1;
		if (isMoreThanOneDay) {
			
		}
	}
}

export function BoozesChart({ boozes }: { boozes: Booze[] }) {
	const [averageQuantity, setAverageQuantity] = useState<number | undefined>(
		undefined,
	);
	const [filledBoozes, setFilledBoozes] = useState<Booze[]>([]);
	useMemo(() => {
		setFilledBoozes(boozes.filter((booze) => booze.quantityNumber > 0));
	}, [boozes]);
	useMemo(() => {
		setAverageQuantity(Booze.getAverageQuantity(boozes));
	}, [boozes]);

	return (
		<div>
			<BarChart
				data={boozes}
				dataKey="date"
				series={series}
				h={400}
				yAxisProps={{
					mirror: true,
					ticks: [0, 1, 2, 3],
				}}
			/>

			<Flex gap={"md"}>
				{boozes.length > 0 ? (
					<>
						<p>Среднее количество: {averageQuantity?.toFixed(1)}</p>
					</>
				) : null}
			</Flex>
		</div>
	);
}
