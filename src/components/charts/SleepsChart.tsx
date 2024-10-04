import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
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

const chartConfig = {
	hoursSlept: {
		label: "Часов сна",
		color: "black",
	},
} satisfies ChartConfig;

export function SleepsChart({ data }: { data: Sleep[] }) {
	const [averageSleepTime, setAverageSleepTime] = useState<number | undefined>(
		undefined,
	);
	useMemo(() => {
		const average = Sleep.getAverageHoursSlept(data);
		setAverageSleepTime(average);
	}, [data]);
	return (
		<div>
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={data}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<YAxis tickLine={false} tickMargin={10} axisLine={false} />
					<ChartTooltip content={<ChartTooltipContent hideIndicator />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="hoursSlept" fill="var(--color-hoursSlept)" radius={4} />
				</BarChart>
			</ChartContainer>
			{averageSleepTime ? (
				<p>Среднее время сна: {averageSleepTime.toFixed(1)} часов</p>
			) : null}
		</div>
	);
}
