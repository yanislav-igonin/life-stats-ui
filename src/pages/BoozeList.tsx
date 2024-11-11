import { useEffect, useMemo, useState } from "react";
import { getBoozes } from "@/api";
import type { BoozeData, DateRange } from "@/api";
import { SleepsChart } from "@/components/charts/SleepsChart";
import { Booze } from "@/models/booze.model";
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

export function BoozeList() {
	const [datesFilter, setDatesFilter] = useState<[Date | null, Date | null]>([
		startOfDay(subWeeks(new Date(), 2)),
		endOfDay(new Date()),
	]);
	const [boozes, setBoozes] = useState<Booze[]>([]);

	const reversedBoozes = useMemo(() => {
		const copy = JSON.parse(JSON.stringify(boozes)) as BoozeData[];
		const reversed = copy.map((data) => new Booze(data)).reverse();
		return reversed;
	}, [boozes]);

	useEffect(() => {
		const dates: DateRange = {
			from: datesFilter[0]
				? startOfDay(datesFilter[0])
				: startOfDay(subWeeks(new Date(), 2)),
			to: datesFilter[1] ? endOfDay(datesFilter[1]) : endOfDay(new Date()),
		};
		getBoozes(dates).then(setBoozes);
	}, [datesFilter]);

	return (
		<Flex direction="column" gap={"md"}>
			<DatePickerInput
				type="range"
				allowSingleDateInRange
				value={datesFilter}
				onChange={setDatesFilter}
				numberOfColumns={2}
			/>
			{/* <SleepsChart sleeps={boozes} /> */}
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Дата</TableCell>
						<TableCell>Количество</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{reversedBoozes.map((booze) => (
						<TableRow key={booze.id}>
							<TableCell>{booze.date}</TableCell>
							<TableCell>{booze.quantityEmoji}</TableCell>
							<TableCell>
								<Link to={`/booze/${booze.id}`}>
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
