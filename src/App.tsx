import { useEffect, useState } from "react";
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

	return (
		<Container>
			<DatePickerWithRange dates={datesFilter} setDates={setDatesFilter} />
			<SleepsChart data={sleeps} />
		</Container>
	);
}
