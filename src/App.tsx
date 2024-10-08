import { useEffect, useState } from "react";
import "./App.css";
import { getSleeps } from "./api";
import { SleepsChart } from "./components/charts/SleepsChart";
import { Sleep } from "./models/sleep.model";
import { Container } from "./components/Container";
import { DatePickerWithRange } from "./components/DatePickerWithRange";
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
			const sleepsData = response.map((sleep) => new Sleep(sleep));
			setSleeps(sleepsData);
		});
	}, [datesFilter]);

	return (
		<Container>
			<div className="flex flex-col gap-5">
				<DatePickerWithRange dates={datesFilter} setDates={setDatesFilter} />
				<SleepsChart sleeps={sleeps} />
			</div>
		</Container>
	);
}
