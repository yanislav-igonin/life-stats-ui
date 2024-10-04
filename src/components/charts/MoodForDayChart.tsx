import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import type { MoodForDay } from "@/models/moodForDay.model";
import { basicChartConfig } from "./basicChartConfig";

const chartConfig = {
	moodNumber: {
		label: "Качество сна",
		...basicChartConfig,
	},
} satisfies ChartConfig;

export function MoodForDayChart({ data }: { data: MoodForDay[] }) {
	return (
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
	);
}
