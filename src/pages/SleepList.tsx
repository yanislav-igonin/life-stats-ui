import { useEffect, useMemo, useState } from "react";
import { getSleeps } from "@/api";
import type { DateRange } from "@/api";
import { SleepsChart } from "@/components/charts/SleepsChart";
import { Sleep } from "@/models/sleep.model";
import { endOfDay, startOfDay, subWeeks } from "date-fns";
import { Link } from "react-router-dom";
import { DatePickerInput } from "@/components/ui/DatePickerInput";
import { Flex } from "@/components/ui/Flex";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@/components/ui/Table";
import { IconEdit } from "@/components/icons";

export function SleepList() {
	const [datesFilter, setDatesFilter] = useState<[Date | null, Date | null]>([
		startOfDay(subWeeks(new Date(), 2)),
		endOfDay(new Date()),
	]);
	const [sleeps, setSleeps] = useState<Sleep[]>([]);

	const reversedSleeps = useMemo(() => {
		const copy = JSON.parse(JSON.stringify(sleeps)) as Sleep[];
		const reversed = copy.map((data) => new Sleep(data)).reverse();
		return reversed;
	}, [sleeps]);

	useEffect(() => {
		const dates: DateRange = {
			from: datesFilter[0]
				? startOfDay(datesFilter[0])
				: startOfDay(subWeeks(new Date(), 2)),
			to: datesFilter[1] ? endOfDay(datesFilter[1]) : endOfDay(new Date()),
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
		<Flex direction="column" gap={"md"}>
			<DatePickerInput
				type="range"
				allowSingleDateInRange
				value={datesFilter}
				onChange={setDatesFilter}
			/>
			<SleepsChart sleeps={sleeps} />
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Дата</TableCell>
						<TableCell>Качество</TableCell>
						<TableCell>Настроение</TableCell>
						<TableCell>Время сна</TableCell>
						<TableCell>Действия</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{reversedSleeps.map((sleep) => (
						<TableRow key={sleep.id}>
							<TableCell>{sleep.date}</TableCell>
							<TableCell>{sleep.qualityEmoji}</TableCell>
							<TableCell>{sleep.moodEmoji}</TableCell>
							<TableCell>{sleep.hoursSlept}</TableCell>
							<TableCell>
								<Link to={`/sleep/${sleep.id}`}>
									<IconEdit size={20} />
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Flex>
	);
}
