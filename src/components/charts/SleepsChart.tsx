import { CartesianGrid, XAxis, YAxis, LineChart, Line } from "recharts";
import { Sleep } from "../../models/sleep.model";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { useState, useMemo } from "react";
import { basicChartConfig } from "./basicChartConfig";

const chartConfig = {
	hoursSlept: {
		label: "Часов сна",
		...basicChartConfig,
	},
	qualityNumber: {
		label: "Качество сна",
		color: "red",
	},
	moodNumber: {
		label: "Настроение за день",
		color: "blue",
	},
} satisfies ChartConfig;

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
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<LineChart accessibilityLayer data={sleeps}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<YAxis
						tickLine={false}
						axisLine={false}
						mirror={true}
						ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
					/>
					<ChartTooltip content={<ChartTooltipContent hideIndicator />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Line
						dataKey="hoursSlept"
						stroke="var(--color-hoursSlept)"
						radius={4}
					/>
					<Line
						dataKey="qualityNumber"
						stroke="var(--color-qualityNumber)"
						radius={4}
					/>
					<Line
						dataKey="moodNumber"
						stroke="var(--color-moodNumber)"
						radius={4}
					/>
				</LineChart>
			</ChartContainer>

			{sleeps.length > 0 ? (
				<div className="flex gap-5">
					<p>Среднее время сна: {averageHours?.toFixed(1)} часов</p>
					<p>Среднее качество сна: {averageQuality?.toFixed(1)}</p>
					<p>Среднее настроение за день: {averageMood?.toFixed(1)}</p>
				</div>
			) : null}
		</div>
	);
}
