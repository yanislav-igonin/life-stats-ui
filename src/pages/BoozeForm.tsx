import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBooze, saveBooze } from "@/api";
import { Booze, BoozeListElement } from "@/models/booze.model";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import type { DateValue } from "@/components/ui/DateTimePicker";
import { Flex } from "@/components/ui/Flex";

export function BoozeForm() {
	const navigate = useNavigate();
	const [booze, setBooze] = useState<Booze | undefined>(undefined);

	const boozeId = useParams().id;
	if (!boozeId) {
		navigate("/");
		return null;
	}

	useEffect(() => {
		getBooze(Number(boozeId)).then((response) => {
			setBooze(new Booze(response));
		});
	}, [boozeId]);

	function onDateChange(date: DateValue) {
		setBooze((prevState) => {
			if (!prevState) return prevState;
			return new BoozeListElement({
				...prevState,
				createdAt: date,
			});
		});
	}

	function onSelect(value: BoozeQuantity) {
		setBooze((prevState) => {
			if (!prevState) return prevState;
			return new BoozeListElement({
				...prevState,
				quantity: value,
			});
		});
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!booze) {
			return;
		}
		saveBooze({
			id: booze.id,
			createdAt: booze.createdAt.toISOString(),
			quantity: booze.quantity,
		}).then(() => {
			navigate("/booze/list");
		});
	}

	if (!booze) {
		return <div>Loading...</div>;
	}

	const quantityOptions = {
		low: "🤤",
		medium: "🥴",
		high: "🤢",
	};

	return (
		<>
			<h1 className="mb-5">Изменить запись алкоголя</h1>

			<form onSubmit={handleSubmit}>
				<Flex direction="column" gap={"md"}>
					<Input label="ID" name="id" value={booze.id} disabled />

					<DateTimePicker
						label="Дата"
						name="createdAt"
						value={booze.createdAt}
						onChange={(date) => onDateChange(date)}
					/>

					<Select
						label="Количество"
						name="quantity"
						value={booze.quantity}
						data={Object.entries(quantityOptions).map(([key, value]) => ({
							value: key,
							label: value,
						}))}
						onChange={(event) => onSelect(event.currentTarget.value)}
					/>

					<Button type="submit" className="mt-5">
						Сохранить
					</Button>
				</Flex>
			</form>
		</>
	);
}
