import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSleep, saveSleep } from "@/api";
import { Sleep } from "@/models/sleep.model";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import type { DateValue } from "@/components/ui/DateTimePicker";
import { Flex } from "@/components/ui/Flex";

export function SleepForm() {
	const navigate = useNavigate();
	const [sleep, setSleep] = useState<Sleep | undefined>(undefined);

	const sleepId = useParams().id;
	if (!sleepId) {
		navigate("/");
		return null;
	}

	useEffect(() => {
		getSleep(Number(sleepId)).then((response) => {
			setSleep(new Sleep(response));
		});
	}, [sleepId]);

	function onDateChange(date: DateValue, name: string) {
		// @ts-expect-error - 2 lame to fix type error rn
		setSleep((prevState) => {
			return {
				...prevState,
				[name]: date,
			};
		});
	}

	function onSelect(name: string, value: string) {
		// @ts-expect-error - 2 lame to fix type error rn
		setSleep((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!sleep) {
			return;
		}
		saveSleep(sleep).then(() => {
			navigate("/sleep/list");
		});
	}

	if (!sleep) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h1 className="mb-5">Изменить запись сна</h1>

			<form onSubmit={handleSubmit}>
				<Flex direction="column" gap={"md"}>
					<Input label="ID" name="id" value={sleep.id} disabled />

					<DateTimePicker
						label="Время отхода ко сну"
						name="goToBedAt"
						value={sleep.goToBedAt}
						onChange={(date) => onDateChange(date, "goToBedAt")}
					/>

					<DateTimePicker
						label="Время подъема"
						name="wakeUpAt"
						value={sleep.wakeUpAt}
						onChange={(date) => onDateChange(date, "wakeUpAt")}
					/>

					<Select
						label="Качество сна"
						name="quality"
						value={sleep.quality}
						data={Object.entries(sleep.qualityEmojiMap).map(([key, value]) => ({
							value: key,
							label: value,
						}))}
						onChange={(event) => onSelect("quality", event.currentTarget.value)}
					/>

					<Select
						label="Настроение за день"
						name="moodOfDay"
						value={sleep.moodOfDay}
						data={Object.entries(sleep.moodEmojiMap).map(([key, value]) => ({
							value: key,
							label: value,
						}))}
						onChange={(event) =>
							onSelect("moodOfDay", event.currentTarget.value)
						}
					/>

					<Button type="submit" className="mt-5">
						Сохранить
					</Button>
				</Flex>
			</form>
		</>
	);
}
