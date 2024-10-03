import { useEffect, useState } from "react";
import "./App.css";
import { getSleeps } from "./api";
import { SleepsChart } from "./components/charts/SleepsChart";
import { Sleep } from "./models/sleep.model";
import { Container } from "./components/Container";
import { DatePickerWithRange } from "./components/charts/DatePickerWithRange";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { endOfDay, startOfDay } from "date-fns";

export function App() {
	const [date, setDate] = useState<DateRange | undefined>({
		from: startOfDay(DateTime.now().minus({ weeks: 2 }).toJSDate()),
		to: endOfDay(new Date()),
	});

	const [sleeps, setSleeps] = useState<Sleep[]>([]);
	useEffect(() => {
		getSleeps(date).then((response) => {
			setSleeps(response.map((sleep) => new Sleep(sleep)));
		});
	}, [date]);

	return (
		<Container>
			<DatePickerWithRange date={date} setDate={setDate} />
			<SleepsChart data={sleeps} />
		</Container>
	);
}
