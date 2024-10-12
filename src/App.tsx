import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { getSleeps } from "./api";
import { SleepsChart } from "./components/charts/SleepsChart";
import { Sleep } from "./models/sleep.model";
import { Container } from "./components/Container";
import { DatePickerWithRange } from "./components/DatePickerWithRange";
import type { DateRange } from "react-day-picker";
import { endOfDay, startOfDay, subWeeks } from "date-fns";
import { Link } from "react-router-dom";
import {
	Table,
	TableRow,
	TableCell,
	TableBody,
	TableHeader,
} from "./components/ui/table";

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
			const sleepsData = response
				.map((sleep) => new Sleep(sleep))
				/** Filter out incomplete records */
				.filter(({ hoursSlept, date }) => hoursSlept > 0 && date);
			setSleeps(sleepsData);
		});
	}, [datesFilter]);

	return (
		<Container>
			<div className="flex flex-col gap-5">
				<DatePickerWithRange dates={datesFilter} setDates={setDatesFilter} />
				<SleepsChart sleeps={sleeps} />
				<Table>
					<TableHeader>
						<TableRow>
							<TableCell>Дата</TableCell>
							<TableCell>Качество</TableCell>
							<TableCell>Настроение</TableCell>
							<TableCell>Время сна</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sleeps.map((sleep) => (
							<TableRow key={sleep.id}>
								<TableCell>{sleep.date}</TableCell>
								<TableCell>{sleep.qualityEmoji}</TableCell>
								<TableCell>{sleep.moodEmoji}</TableCell>
								<TableCell>{sleep.hoursSlept}</TableCell>
								<TableCell>
									<Link to={`/sleep/${sleep.id}`}>Изменить</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Container>
	);
}
