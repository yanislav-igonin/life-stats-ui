import { Sleep } from "@/models/sleep.model";
import { useState, useMemo } from "react";
import { LineChart } from "@mantine/charts";
import type { LineChartSeries } from "@mantine/charts";
import { Flex } from "@/components/ui/Flex";

const series: LineChartSeries[] = [
	{
		label: "Часов сна",
		name: "hoursSlept",
		color: "black",
	},
	{
		label: "Качество сна",
		name: "qualityNumber",
		color: "red",
	},
	{
		label: "Настроение за день",
		name: "moodNumber",
		color: "blue",
	},
];

export function SleepsChart({ sleeps }: { sleeps: Sleep[] }) {
	const [averageHours, setAverageHours] = useState<number | undefined>(
		undefined,
	);
	const [averageQuality, setAverageQuality] = useState<number | undefined>(
		undefined,
	);
	const [averageMood, setAverageMood] = useState<number | undefined>(undefined);
	useMemo(() => {
		setAverageHours(Sleep.getAverageHoursSlept(sleeps));
		setAverageQuality(Sleep.getAverageSleepQuality(sleeps));
		setAverageMood(Sleep.getAverageMoodOfDay(sleeps));
	}, [sleeps]);

	return (
		<div>
			<LineChart
				data={sleeps}
				dataKey="date"
				series={series}
				curveType="linear"
				h={400}
				yAxisProps={{
					mirror: true,
					ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				}}
			/>

			<Flex gap={"md"}>
				{sleeps.length > 0 ? (
					<>
						<p>Среднее время сна: {averageHours?.toFixed(1)} часов</p>
						<p>Среднее качество сна: {averageQuality?.toFixed(1)}</p>
						<p>Среднее настроение за день: {averageMood?.toFixed(1)}</p>
					</>
				) : null}
			</Flex>
		</div>
	);
}
