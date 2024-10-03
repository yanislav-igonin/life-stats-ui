import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { getSleeps } from "./api";
import { SleepsChart } from "./components/charts/SleepsChart";
import { Sleep } from "./models/sleep.model";
import { Container } from "./components/Container";
import { DatePickerWithRange } from "./components/charts/DatePickerWithRange";
import type { DateRange } from "react-day-picker";
import { endOfDay, startOfDay, subWeeks } from "date-fns";

export function App() {
	const [datesFilter, setDatesFilter] = useState<DateRange | undefined>({
		from: startOfDay(subWeeks(new Date(), 2)),
		to: endOfDay(new Date()),
	});
	const [averageSleepTime, setAverageSleepTime] = useState<number | undefined>(
		undefined,
	);

	const [sleeps, setSleeps] = useState<Sleep[]>([]);
	useEffect(() => {
		const dates = {
			from: datesFilter?.from
				? startOfDay(datesFilter.from)
				: startOfDay(subWeeks(new Date(), 2)),
			to: datesFilter?.to ? endOfDay(datesFilter.to) : endOfDay(new Date()),
		};
		getSleeps(dates).then((response) => {
			setSleeps(response.map((sleep) => new Sleep(sleep)));
		});
	}, [datesFilter]);

	useMemo(() => {
		const average = Sleep.getAverageHoursSlept(sleeps);
		setAverageSleepTime(average);
	}, [sleeps]);

	return (
		<Container>
			<DatePickerWithRange dates={datesFilter} setDates={setDatesFilter} />
			<SleepsChart data={sleeps} />
			{averageSleepTime ? (
				<p>Среднее время сна: {averageSleepTime.toFixed(1)} часов</p>
			) : null}
		</Container>
	);
}
