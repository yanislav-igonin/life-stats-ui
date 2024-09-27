import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	XAxisProps,
	YAxisProps,
	BarProps,
	YAxis,
	Tooltip,
	TooltipProps,
	DefaultTooltipContentProps,
} from "recharts";
import type { Sleep } from "../../models/sleep.model";

const xAxisProps: XAxisProps = {
	dataKey: "date",
	tickLine: false,
	tickMargin: 10,
	axisLine: false,
};

const yAxisProps: YAxisProps = {
	tickLine: false,
	tickMargin: 10,
};

const barProps: BarProps = {
	dataKey: "hoursSlept",
	fill: "red",
};

function CustomTooltip(props: DefaultTooltipContentProps) {
	const { payload, active } = props;

	if (!active || !payload?.length) {
		return null;
	}

	const element = payload[0].payload;
	return (
		<div className="bg-white rounded-lg shadow-lg p-4 text-center">
			<p className="text-sm font-medium text-gray-900">
				{element.hoursSlept.toFixed(1)} hours slept
			</p>
			<p className="text-xs text-gray-500">{element.date}</p>
		</div>
	);
}
const tooltipProps = {
	cursor: true,
	content: <CustomTooltip />,
};

export function SleepsChart({ data }: { data: Sleep[] }) {
	return (
		<ResponsiveContainer maxHeight={500}>
			<BarChart data={data}>
				{/* // @ts-expect-error - Strange typings */}
				<Bar {...barProps} />
				<XAxis {...xAxisProps} />
				<YAxis {...yAxisProps} />
				<Tooltip {...tooltipProps} />
			</BarChart>
		</ResponsiveContainer>
	);
}
