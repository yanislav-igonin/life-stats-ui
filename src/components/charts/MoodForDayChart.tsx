import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { MoodForDay } from "@/models/moodForDay.model";
import { basicChartConfig } from "./basicChartConfig";
import { useState, useMemo } from "react";

const chartConfig = {
	moodNumber: {
		label: "Настроение за день",
		...basicChartConfig,
	},
} satisfies ChartConfig;

export function MoodForDayChart({ data }: { data: MoodForDay[] }) {
	const [average, setAverage] = useState<number | undefined>(undefined);
	useMemo(() => {
		setAverage(MoodForDay.getAverageMoodForDay(data));
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
					<YAxis
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						domain={[0, 5]}
					/>
					<ChartTooltip content={<ChartTooltipContent hideIndicator />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="moodNumber" fill="var(--color-moodNumber)" radius={4} />
				</BarChart>
			</ChartContainer>

			{average ? <p>Среднее настроение за день: {average.toFixed(1)}</p> : null}
		</div>
	);
}
